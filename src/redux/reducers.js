import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import user from "./user/user.duck";
import menu from "./menu/reducers";
import settings from "./settings/settings.duck";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings
  });
