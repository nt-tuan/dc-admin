import { WSClient } from "utils";
import { all, put, take, delay, select, takeLatest } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { getNotificationList } from "services/notification.service";
import * as NOTIFICATION_DUCK from "./notification.duck";
import * as USER_DUCK from "redux/user/user.duck";
import { COMPANY_STATUSES } from "commons/consts";

let _wsClient;
const { setStateAction } = NOTIFICATION_DUCK;
const { selectCurrentUser } = USER_DUCK;

// eslint-disable-next-line
function* createSocketChannel(wsClient, userId) {
  return new eventChannel((emit) => {
    wsClient.subscribe(`/notification/${userId}`, (m) => {
      const message = JSON.parse(m.body);
      emit(message);
    });

    return () => {};
  });
}

export function* INIT() {
  _wsClient = yield WSClient.create();
  _wsClient.deactivate();
  const user = yield select(selectCurrentUser);
  if (!user.authorized || user.companyStatus !== COMPANY_STATUSES.ACTIVE) {
    return;
  }
  yield put(setStateAction({ newMessage: !user.messageRead }));
  const { content, totalPages } = yield getNotificationList(0, 5);
  yield put(setStateAction({ popupList: content, totalPages }));

  if (user.byWeb === false) {
    return;
  }

  yield new Promise((r) => {
    _wsClient.onConnect = (frame) => {
      r(_wsClient.connected);
    };

    if (_wsClient.connected === false) {
      _wsClient.activate();
    }
  });
  const channel = yield createSocketChannel(_wsClient, user.id);
  while (true) {
    const payload = yield take(channel);
    yield put(setStateAction({ isLoadingNewMessage: true }));
    yield put({ type: NOTIFICATION_DUCK.PUSH_MESSAGE, payload });
    yield put(setStateAction({ isLoadingNewMessage: false }));
  }
}

export function* INIT_PAGINATED_MESSAGE({ payload }) {
  const { afterInit, itemPerPage } = payload;
  yield put(setStateAction({ isLoadingMore: true }));
  const { content } = yield getNotificationList(0, itemPerPage);
  yield delay(500);
  yield put(setStateAction({ paginatedList: [...content] }));
  yield put(setStateAction({ isLoadingMore: false }));
  afterInit();
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
  yield _wsClient.deactivate();
}

export default function* rootSaga() {
  yield all([
    takeLatest(NOTIFICATION_DUCK.INIT, INIT),
    takeLatest(NOTIFICATION_DUCK.LOAD_MESSAGE, LOAD_MESSAGE),
    takeLatest(NOTIFICATION_DUCK.INIT_PAGINATED_MESSAGE, INIT_PAGINATED_MESSAGE),
    takeLatest(NOTIFICATION_DUCK.DEACTIVATE, DEACTIVATE)
  ]);
}
