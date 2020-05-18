import { all } from "redux-saga/effects";
import user from "./user/user.saga";
import menu from "./menu/sagas";
import settings from "./settings/setting.saga";

export default function* rootSaga() {
  yield all([user(), menu(), settings()]);
}
