import { PERMISSIONS_IDS, PERMISSION_LEVELS } from "commons/consts";

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
  id: "",
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
export const selectUserCountry = (state) => state.user.country;
export const selectTimezone = (state) => state.user.company.timezone;
export const selectLoadingState = (state) => state.user.loading;
export const selectCurrentUser = (state) => state.user;
export const selectCompanyLogo = (state) => state.user.logoUrl;
export const selectCompanyStatus = (state) => state.user.companyStatus;
export const selectUserPermissionList = (state) => state.user.permissionList;
export const selectUserLoginStatus = (state) => state.user.authorized;
export const selectSuccessfulTransactions = (state) => state.user.company.totalNumberOfTransaction;
export const selectLargestTransactionValue = (state) => state.user.company.transactionValue;
export const selectIsAdminRight = (state) => {
  const user = state.user;
  const { permissionList } = user;
  let isAdmin = false;
  if (permissionList && Array.isArray(permissionList)) {
    isAdmin = permissionList.some(
      ({ permissionCatalogId, permissionLevel }) =>
        permissionCatalogId === PERMISSIONS_IDS.ADMIN &&
        permissionLevel === PERMISSION_LEVELS.APPROVER
    );
  }
  return isAdmin;
};
export const selectCompanyId = (state) => state.user.company.id;

export const selectUpdateTimeZone = (state) => {
  return {
    workingStartTime: state.user.company.workingStartTime,
    workingEndTime: state.user.company.workingEndTime,
    workingDays: state.user.company.workingDays,
    timezone: state.user.company.timezone,
    country: state.user.country
  };
};

export const selectCompanyName = (state) => state.user.company.name;
