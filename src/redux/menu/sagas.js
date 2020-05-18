import { all, put, call, takeEvery } from "redux-saga/effects";
import actions, { getUserData } from "./actions";

export function* GET_USER_DATA() {
  const menuData = yield call(getUserData);
  yield put({
    type: "menu/SET_STATE",
    payload: {
      menuData
    }
  });
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SET_USER_DATA, GET_USER_DATA)]);
}
