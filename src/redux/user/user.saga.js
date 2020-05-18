import { all, put } from "redux-saga/effects";
import * as USER_ACTIONS from "./user.duck";

const { setStateAction } = USER_ACTIONS;

export function* LOAD_CURRENT_ACCOUNT() {
  try {
    yield put(setStateAction({ loading: true }));
    const user = {};
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
    LOAD_CURRENT_ACCOUNT() // run once on app load to check user auth
  ]);
}
