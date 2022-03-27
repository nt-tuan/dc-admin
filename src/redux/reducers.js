import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import kyc3 from "./kyc/step3/kyc3.duck";
import notification from "./notification/notification.duck";
import settings from "./settings/settings.duck";
import storage from "./storage/storage.duck";
import user from "./user/user.duck";
import configs from "./configs/configs.duck";
import withdrawFund from "./withdraw-fund/withdrawFund.duck";

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    settings,
    storage,
    notification,
    kyc3,
    configs,
    withdrawFund
  });
export default reducer;
