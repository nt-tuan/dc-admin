import store from "store";

export const SET_STATE = "@@settings/SET_STATE";
export const CHANGE_SETTING = "@@settings/CHANGE_SETTING";

const STORED_SETTINGS = (storedSettings) => {
  const settings = {};
  Object.keys(storedSettings).forEach((key) => {
    const item = store.get(`app.settings.${key}`);
    settings[key] = typeof item !== "undefined" ? item : storedSettings[key];
  });
  return settings;
};

const initialState = {
  ...STORED_SETTINGS({
    isSidebarOpen: false,
    isSupportChatOpen: false,
    isMobileView: false,
    isMobileMenuOpen: false,
    isMenuCollapsed: false,
    isMenuShadow: false,
    isMenuUnfixed: false,
    menuLayoutType: "left", // left, top, nomenu
    menuType: "default", // default, flyout, compact
    menuColor: "blue", // dark, blue, gray, white
    flyoutMenuColor: "dark", // dark, blue, gray, white
    systemLayoutColor: "gray", // white, dark, blue, gray, image
    isTopbarFixed: false,
    isContentNoMaxWidth: true,
    isAppMaxWidth: false,
    isGrayBackground: true,
    isGrayTopbar: false,
    isCardShadow: false,
    isSquaredBorders: false,
    isBorderless: false,
    routerAnimation: "slide-fadein-up" // none, slide-fadein-up, slide-fadein-right, fadein, zoom-fadein
  }),
  browserFingerprint: ""
};

export default function settingsReducer(state = initialState, action) {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const selectIsMenuCollapsed = (state) => state.settings.isMenuCollapsed;
export const selectSetting = (state) => state.settings;
export const selectBrowserFingerprint = (state) => state.settings.browserFingerprint;
