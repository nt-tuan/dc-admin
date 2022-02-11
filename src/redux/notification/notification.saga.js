import { all, put, take, delay, select, takeLatest } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { getNotificationList } from "services/notification.service";
import * as NOTIFICATION_DUCK from "./notification.duck";
import * as USER_DUCK from "redux/user/user.duck";
import { WSClient } from "utils/web-socket.util";

let _wsClient;
const { setStateAction } = NOTIFICATION_DUCK;
const { selectCurrentUser } = USER_DUCK;

function createSocketChannel(wsClient, userId) {
  return eventChannel((emit) => {
    const subscription = wsClient.subscribe(`/notification/admin/${userId}`, (m) => {
      const message = JSON.parse(m.body);
      emit(message);
    });

    return () => {
      subscription.unsubscribe();
    };
  });
}

export function* INIT() {
  _wsClient = yield WSClient.create();
  _wsClient.deactivate();
  const user = yield select(selectCurrentUser);
  if (user.authorized === false) {
    return;
  }
  const channel = eventChannel((emit) => {
    _wsClient.onConnect = () => {
      emit({
        type: NOTIFICATION_DUCK.LISTEN,
        payload: {
          user,
          wsClient: _wsClient
        }
      });
    };
    return () => {};
  });

  if (_wsClient.connected === false) {
    _wsClient.activate();
  }
  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } finally {
    channel.close();
  }
}

function* LISTEN(action) {
  const { user, wsClient } = action.payload;
  const { content, totalPages } = yield getNotificationList(0, 5);
  yield put(setStateAction({ newMessage: user && !user.messageRead }));
  yield put(setStateAction({ popupList: content, totalPages }));
  const channel = createSocketChannel(wsClient, user.id);
  try {
    while (true) {
      const payload = yield take(channel);
      yield put(setStateAction({ newMessage: true }));
      yield put(setStateAction({ isLoadingNewMessage: true }));
      yield put({ type: NOTIFICATION_DUCK.PUSH_MESSAGE, payload });
      yield put(setStateAction({ isLoadingNewMessage: false }));
    }
  } finally {
    channel.close();
  }
}

export function* INIT_PAGINATED_MESSAGE({ payload }) {
  const { afterInit, itemPerPage } = payload;
  yield put(setStateAction({ isLoadingMore: true }));
  const { content } = yield getNotificationList(0, itemPerPage);
  yield delay(500);
  yield put(setStateAction({ paginatedList: [...content] }));
  yield put(setStateAction({ isLoadingMore: false }));
  if (afterInit) afterInit();
}

export function* LOAD_MESSAGE({ payload }) {
  const { page, itemPerPage } = payload;
  const currentList = yield select(NOTIFICATION_DUCK.selectNotificationPaginatedList);
  yield put(setStateAction({ isLoadingMore: true }));
  const { content } = yield getNotificationList(page, itemPerPage);
  yield delay(500);
  yield put(setStateAction({ paginatedList: [...currentList, ...content] }));
  yield put(setStateAction({ isLoadingMore: false }));
}

export function* DEACTIVATE() {
  _wsClient?.beforeSubscribe && _wsClient.beforeSubscribe();
  _wsClient?.beforeCreate && _wsClient.beforeCreate();
  yield _wsClient.deactivate();
}

export default function* rootSaga() {
  yield all([
    takeLatest(NOTIFICATION_DUCK.INIT, INIT),
    takeLatest(NOTIFICATION_DUCK.LISTEN, LISTEN),
    takeLatest(NOTIFICATION_DUCK.LOAD_MESSAGE, LOAD_MESSAGE),
    takeLatest(NOTIFICATION_DUCK.INIT_PAGINATED_MESSAGE, INIT_PAGINATED_MESSAGE),
    takeLatest(NOTIFICATION_DUCK.DEACTIVATE, DEACTIVATE)
  ]);
}
