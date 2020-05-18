import { all, put, call, takeEvery } from "redux-saga/effects";
import actions, { getBuyerData, getSellerData, getAdminData } from "./actions";

export function* GET_BUYER_DATA() {
  const menuData = yield call(getBuyerData);
  yield put({
    type: "menu/SET_STATE",
    payload: {
      menuData
    }
  });
}

export function* GET_SELLER_DATA() {
  const menuData = yield call(getSellerData);
  yield put({
    type: "menu/SET_STATE",
    payload: {
      menuData
    }
  });
}

export function* GET_ADMIN_DATA() {
  const menuData = yield call(getAdminData);
  yield put({
    type: "menu/SET_STATE",
    payload: {
      menuData
    }
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SET_BUYER_DATA, GET_BUYER_DATA),
    takeEvery(actions.SET_SELLER_DATA, GET_SELLER_DATA),
    takeEvery(actions.SET_ADMIN_DATA, GET_ADMIN_DATA)
  ]);
}
