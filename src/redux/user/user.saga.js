import { all, put, takeEvery, call } from "redux-saga/effects";
import * as USER_ACTIONS from "./user.duck";
import { notification } from "antd";
import { ConstFacade } from "commons/consts/const.facade";
import { APIError } from "commons/types";
import { AuthService, UserService } from "services";

const messages = ConstFacade.getMessages();

const { setStateAction } = USER_ACTIONS;

export function* LOGIN({ payload }) {
  const { values, onError } = payload;
  try {
    yield put(setStateAction({ loading: true }));
    const isOk = yield AuthService.login(values);
    if (isOk) {
      yield put({ type: USER_ACTIONS.LOAD_CURRENT_ACCOUNT });
      notification.success({
        message: messages.LOGIN_SUCCESS_TITLE,
        description: messages.LOGIN_SUCCESS_MSG
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

export function* LOAD_CURRENT_ACCOUNT() {
  try {
    yield put(setStateAction({ loading: true }));
    const user = UserService.getCurrentAccount();
    if (user) {
      yield put({
        type: USER_ACTIONS.SET_STATE,
        payload: {
          ...user,
          authorized: true
        }
      });
    } else {
      yield put({
        type: USER_ACTIONS.SET_STATE,
        payload: {
          ...user,
          authorized: false
        }
      });
    }
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
