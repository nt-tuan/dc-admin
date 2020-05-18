import actions from "./actions";

const initialState = {
  menuData: []
};

export default function menuReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const selectMenuData = (state) => state.menu.menuData;
