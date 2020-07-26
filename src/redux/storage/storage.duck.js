export const SET_STATE = "@@DTC/STORAGE/SET_STATE";
export const SAVE_TO_STORAGE = "@@DTC/STORAGE/SAVE_TO_STORAGE";
export const GET_FROM_STORAGE = "@@DTC/STORAGE/GET_FROM_STORAGE";
export const CLEAR_FROM_STORAGE = "@@DTC/STORAGE/CLEAR_FROM_STORAGE";

export const setStateAction = (payload) => {
  return {
    type: SET_STATE,
    payload: payload
  };
};

const initialState = {
  loading: true
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const selectPageData = (pageName) => (state) => state.storage[pageName];
