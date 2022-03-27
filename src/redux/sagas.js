import { all } from "redux-saga/effects";
import user from "./user/user.saga";
import settings from "./settings/setting.saga";
import storage from "./storage/storage.saga";
import notification from "./notification/notification.saga";
import kyc3 from "./kyc/step3/kyc3.saga";
import configs from "./configs/configs.saga";
import withdrawFund from "./withdraw-fund/withdrawFund.saga";

export default function* rootSaga() {
  yield all([user(), settings(), storage(), notification(), kyc3(), configs(), withdrawFund()]);
}
