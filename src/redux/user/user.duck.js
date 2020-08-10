export const SET_STATE = "@@DTC/USER/SET_STATE";
export const LOGIN = "@@DTC/USER/LOGIN";
export const LOAD_CURRENT_ACCOUNT = "@@DTC/USER/LOAD_CURRENT_ACCOUNT";
export const LOGOUT = "@@DTC/USER/LOGOUT";
export const REGISTER = "@@DTC/USER/REGISTER";
export const UPDATE_PROFILE = "@@DTC/USER/UPDATE_PROFILE";

export const setStateAction = (payload) => {
  return {
    type: SET_STATE,
    payload: payload
  };
};

const initialState = {
  id: "c746d9b3-bdc9-4017-beba-cb811b3eea17",
  country: "",
  email: "",
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  username: "",
  companyName: "",
  status: undefined,
  authorized: false,
  loading: true,
  phoneVerified: false,
  byEmail: false,
  byWeb: false,
  byWhatsapp: false,
  company: {},
  permissionList: [],
  logoUrl: null,
  companyStatus: false,
  timezone: undefined
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const selectUserId = (state) => state.user.id;
export const selectUsername = (state) => state.user.username;
export const selectLoadingState = (state) => state.user.loading;
export const selectCurrentUser = (state) => state.user;
export const selectUserEmail = (state) => state.user.email;
