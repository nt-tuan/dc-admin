import { all, put, takeEvery } from "redux-saga/effects";
import { StorageService } from "services";
import { log } from "utils/logger.util";
import * as STORAGE_DUCK from "./storage.duck";

const { setStateAction } = STORAGE_DUCK;

export function* FETCH_STORAGE({ payload }) {
  const { pageName } = payload;
  try {
    yield put(setStateAction({ loading: true }));
    const data = yield StorageService.getData(pageName);
    yield put(setStateAction({ [pageName]: data }));
    yield put(setStateAction({ loading: false }));
  } catch (error) {
    log(error);
  }
}

export function* SAVE_STORAGE({ payload }) {
  const { pageName, data } = payload;
  try {
    yield StorageService.saveData(pageName, data);
  } catch (error) {
    log(error);
  }
}

export function* CLEAR_STORAGE({ payload }) {
  const { pageName } = payload;
  try {
    yield StorageService.clearData(pageName);
    yield put(setStateAction({ [pageName]: undefined }));
  } catch (error) {
    log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(STORAGE_DUCK.GET_FROM_STORAGE, FETCH_STORAGE),
    takeEvery(STORAGE_DUCK.SAVE_TO_STORAGE, SAVE_STORAGE),
    takeEvery(STORAGE_DUCK.CLEAR_FROM_STORAGE, CLEAR_STORAGE)
  ]);
}
