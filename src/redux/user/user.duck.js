import { TWO_FACTOR_AUTH_TYPES } from "@/commons/consts";

export const SET_STATE = "@@DTC/USER/SET_STATE";
export const LOGIN = "@@DTC/USER/LOGIN";
export const REGISTER_INTRODUCER = "@@DTC/USER/REGISTER/INTRODUCER";
export const UPDATE_PROFILE_INTRODUCER = "@@DTC/USER/UPDATE/PROFILE/INTRODUCER";
export const LOAD_CURRENT_ACCOUNT = "@@DTC/USER/LOAD_CURRENT_ACCOUNT";
export const LOGOUT = "@@DTC/USER/LOGOUT";
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
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
export const selectUsers = (state) => state.user;
export const selectUserId = (state) => state.user.id;
export const selectUsername = (state) => state.user.username;
export const selectLoadingState = (state) => state.user.loading;
export const selectCurrentUser = (state) => state.user;
export const selectUserEmail = (state) => state.user.email;

export const selectSuccessfulTransactions = (state) => state.user.company.totalNumberOfTransaction;
export const selectLargestTransactionValue = (state) => state.user.company.transactionValue;
export const selectCompanyName = (state) => state.user.company.name;
export const selectGAVerified = (state) => state.user.gaVerified;
export const selectPhoneVerified = (state) => state.user.phoneVerified;

export const select2FASettings = (state) => {
  // const tfaType = state.user;
  if (state.user.tfaType === TWO_FACTOR_AUTH_TYPES.WHATSAPP_EVERY_LOGIN) {
    return {
      tfaMethod: "WHATS_APP",
      tfaType: "EVERY_LOGIN"
    };
  } else if (state.user.tfaType === TWO_FACTOR_AUTH_TYPES.WHATSAPP_PER_30_DAYS) {
    return {
      tfaMethod: "WHATS_APP",
      tfaType: "PER_30_DAYS"
    };
  } else if (state.user.tfaType === TWO_FACTOR_AUTH_TYPES.EMAIL_EVERY_LOGIN) {
    return {
      tfaMethod: "EMAIL",
      tfaType: "EVERY_LOGIN"
    };
  } else if (state.user.tfaType === TWO_FACTOR_AUTH_TYPES.EMAIL_PER_30_DAYS) {
    return {
      tfaMethod: "EMAIL",
      tfaType: "PER_30_DAYS"
    };
  } else if (state.user.tfaType === TWO_FACTOR_AUTH_TYPES.SMS_EVERY_LOGIN) {
    return {
      tfaMethod: "SMS",
      tfaType: "EVERY_LOGIN"
    };
  } else if (state.user.tfaType === TWO_FACTOR_AUTH_TYPES.SMS_PER_30_DAYS) {
    return {
      tfaMethod: "SMS",
      tfaType: "PER_30_DAYS"
    };
  } else if (state.user.tfaType === TWO_FACTOR_AUTH_TYPES.GA_EVERY_LOGIN) {
    return {
      tfaMethod: "GA",
      tfaType: "EVERY_LOGIN"
    };
  } else if (state.user.tfaType === TWO_FACTOR_AUTH_TYPES.GA_PER_30_DAYS) {
    return {
      tfaMethod: "GA",
      tfaType: "PER_30_DAYS"
    };
  } else {
    return {
      tfaMethod: "",
      tfaType: "DISABLE"
    };
  }
  /*tfaMethod: state.user.tfaMethod,
    tfaType: state.user.tfaType*/
};

export const selectWalletName = (state) => state.user.walletName;
