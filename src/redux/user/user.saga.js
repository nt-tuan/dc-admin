import * as NOTIFICATION_DUCKS from "redux/notification/notification.duck";
import * as USER_ACTIONS from "./user.duck";

import { AuthService, UserService } from "services";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { APIError } from "commons/types";

const { setStateAction } = USER_ACTIONS;

export function* LOGIN({ payload }) {
  const { values, onError, onSuccess } = payload;
  try {
    yield put(setStateAction({ loading: true }));
    const isOk = yield AuthService.login(values);
    if (isOk) {
      yield put({
        type: USER_ACTIONS.LOAD_CURRENT_ACCOUNT,
        payload: {
          onSuccess
        }
      });
    }
  } catch (error) {
    if (error instanceof APIError) {
      onError(error.errors);
      return;
    }
    throw error;
  } finally {
    yield put(setStateAction({ loading: false }));
  }
}

export function* LOGOUT({ payload }) {
  yield call(AuthService.logout);
  yield put(
    setStateAction({
      id: "",
      country: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      username: "",
      companyName: "",
      authorized: false,
      loading: false
    })
  );
  if (payload) {
    const { callback } = payload;
    callback();
  }
}

export function* LOAD_CURRENT_ACCOUNT(data) {
  const { payload } = data || { payload: {} };
  try {
    const { onSuccess } = payload;
    yield put(setStateAction({ loading: true }));
    const user = yield UserService.getCurrentAccount();
    if (user) {
      yield put({
        type: USER_ACTIONS.SET_STATE,
        payload: {
          ...user,
          authorized: true
        }
      });
      yield put({ type: NOTIFICATION_DUCKS.INIT });
    } else {
      yield put({
        type: USER_ACTIONS.SET_STATE,
        payload: {
          ...user,
          authorized: false
        }
      });
    }
    if (onSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line sonarjs/no-useless-catch
  } catch (error) {
    throw error;
  } finally {
    yield put(setStateAction({ loading: false }));
  }
}

export default function* rootSaga() {
  yield all([
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
    takeEvery(USER_ACTIONS.LOGOUT, LOGOUT),
    takeEvery(USER_ACTIONS.LOGIN, LOGIN),
    takeEvery(USER_ACTIONS.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT)
  ]);
}
