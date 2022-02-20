export const initialValues = {
  isSettingsMenu: false,
  menu: []
};

export const TYPE = {
  IS_SETTINGS_MENU: "SETTINGS_MENU",
  SET_MENU: "SET_MENU"
};

export const reducer = (state, action) => {
  switch (action.type) {
    case TYPE.IS_SETTINGS_MENU:
      return {
        ...state,
        isSettingsMenu: action.payload
      };
    case TYPE.SET_MENU:
      return {
        ...state,
        menu: action.payload
      };
    default:
      return state;
  }
};
