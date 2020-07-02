import { history, store as reduxStore } from "index";
import { all, takeEvery, put } from "redux-saga/effects";
import qs from "qs";
import store from "store";
import * as SETTING_DUCK from "./settings.duck";
import { isScreensize } from "utils/general.util";

export function* CHANGE_SETTING({ payload: { setting, value } }) {
  yield store.set(`app.settings.${setting}`, value);
  yield put({
    type: SETTING_DUCK.SET_STATE,
    payload: {
      [setting]: value
    }
  });
}

export function* SETUP() {
  // load settings from url on app load
  const changeSettings = (search) => {
    const query = qs.parse(search, { ignoreQueryPrefix: true });
    Object.keys(query).forEach((key) => {
      reduxStore.dispatch({
        type: SETTING_DUCK.CHANGE_SETTING,
        payload: {
          setting: key,
          value: query[key] === "true"
        }
      });
    });
  };
  yield changeSettings(history.location.search);
  yield history.listen((params) => {
    const { search } = params;
    changeSettings(search);
  });

  // detect isMobileView setting on app load and window resize
  const isMobileView = (load = false) => {
    const currentState = isScreensize("sm");
    const prevState = store.get("app.settings.isMobileView");
    if (currentState !== prevState || load) {
      reduxStore.dispatch({
        type: SETTING_DUCK.CHANGE_SETTING,
        payload: {
          setting: "isMobileView",
          value: currentState
        }
      });
    }
  };

  // detect viewport width on app load and window resize
  const isMenuToggled = () => {
    const shouldToggle = isScreensize("md");
    const prevState = store.get("app.settings.isMenuCollapsed");
    if (shouldToggle || prevState) {
      reduxStore.dispatch({
        type: SETTING_DUCK.CHANGE_SETTING,
        payload: {
          setting: "isMenuCollapsed",
          value: true
        }
      });
    }
  };

  yield isMobileView(true);
  yield isMenuToggled();
  yield window.addEventListener("resize", () => {
    isMobileView();
    isMenuToggled();
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(SETTING_DUCK.CHANGE_SETTING, CHANGE_SETTING),
    SETUP() // run once on app load to init listeners
  ]);
}
