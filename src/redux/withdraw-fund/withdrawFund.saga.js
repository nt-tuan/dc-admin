import * as WITHDRAW_FUND_ACTIONS from "./withdrawFund.duck";
import { put, all, takeLatest } from "redux-saga/effects";
import { createWithdrawFund, customValidateOTP } from "@/services/withdraw-fund.service";

export function* VERIFY_WITHDRAW_CODE_SAGA(action) {
  try {
    const { params } = action;

    const response = yield customValidateOTP(params);

    if (response) {
      yield put(WITHDRAW_FUND_ACTIONS.verifyWithdrawCodeSuccess(response));
    } else {
      yield put(WITHDRAW_FUND_ACTIONS.verifyWithdrawCodeFail());
    }
  } catch (error) {
    yield put(WITHDRAW_FUND_ACTIONS.verifyWithdrawCodeFail());
  }
}

export function* CREATE_WITHDRAW_CODE_SAGA(action) {
  try {
    const { params } = action;

    const response = yield createWithdrawFund(params);

    if (response) {
      yield put(WITHDRAW_FUND_ACTIONS.createWithdrawCodeSuccess(response));
    } else {
      yield put(WITHDRAW_FUND_ACTIONS.createWithdrawCodeFail());
    }
  } catch (error) {
    yield put(WITHDRAW_FUND_ACTIONS.createWithdrawCodeFail());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(WITHDRAW_FUND_ACTIONS.VERIFY_WITHDRAW_CODE_REQUEST, VERIFY_WITHDRAW_CODE_SAGA),
    takeLatest(WITHDRAW_FUND_ACTIONS.CREATE_WITHDRAW_CODE_REQUEST, CREATE_WITHDRAW_CODE_SAGA)
  ]);
}
