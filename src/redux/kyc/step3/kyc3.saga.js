import { all, takeLatest, put } from "redux-saga/effects";
import { getStep3, saveStep3 } from "services/kyc.service";
import * as KYC3_ACTIONS from "./kyc3.duck";

const setStateAction = (payload) => {
  return {
    type: KYC3_ACTIONS.SET_STATE,
    payload: payload
  };
};

function* GET_STEP3() {
  try {
    yield put(setStateAction({ loading: true }));
    const values = yield getStep3();
    if (values.length) {
      yield put(setStateAction({ bankDetails: values }));
    }
    // eslint-disable-next-line sonarjs/no-useless-catch
  } catch (error) {
    throw error;
  } finally {
    yield put(setStateAction({ loading: false }));
  }
}

function* SAVE_STEP3({ payload }) {
  const { values, onNext } = payload;
  try {
    yield put(setStateAction({ loading: true }));
    yield saveStep3(values);
    const updatedValues = yield getStep3();
    if (updatedValues.length) {
      yield put(setStateAction({ bankDetails: updatedValues }));
    }
    onNext && onNext();
    // eslint-disable-next-line sonarjs/no-useless-catch
  } catch (error) {
    throw error;
  } finally {
    yield put(setStateAction({ loading: false }));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(KYC3_ACTIONS.GET_STEP3, GET_STEP3)]);
  yield all([takeLatest(KYC3_ACTIONS.SAVE_STEP3, SAVE_STEP3)]);
}
