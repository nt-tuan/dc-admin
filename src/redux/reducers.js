import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import user from "./user/user.duck";
import menu from "./menu/reducers";
import settings from "./settings/settings.duck";
import storage from "./storage/storage.duck";
import notification from "./notification/notification.duck";
import kyc3 from "./kyc/step3/kyc3.duck";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    storage,
    notification,
    kyc3
  });
