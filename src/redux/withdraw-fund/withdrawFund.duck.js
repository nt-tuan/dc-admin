import { LOCATION_CHANGE } from "connected-react-router";
export const SET_STATE = "@@DTC/CONFIG/SET_STATE_CONFIG";
export const VERIFY_WITHDRAW_CODE_REQUEST = "@@DTC/WITHDRAW_FUND/VERIFY_WITHDRAW_CODE_REQUEST";
export const VERIFY_WITHDRAW_CODE_SUCCESS = "@@DTC/WITHDRAW_FUND/VERIFY_WITHDRAW_CODE_SUCCESS";
export const VERIFY_WITHDRAW_CODE_FAIL = "@@DTC/WITHDRAW_FUND/VERIFY_WITHDRAW_CODE_FAIL";

export const CREATE_WITHDRAW_CODE_REQUEST = "@@DTC/WITHDRAW_FUND/CREATE_WITHDRAW_CODE_REQUEST";
export const CREATE_WITHDRAW_CODE_SUCCESS = "@@DTC/WITHDRAW_FUND/CREATE_WITHDRAW_CODE_SUCCESS";
export const CREATE_WITHDRAW_CODE_FAIL = "@@DTC/WITHDRAW_FUND/CREATE_WITHDRAW_CODE_FAIL";

export const initialState = {
  isApiRequest: false,
  isApiSuccess: false,
  isApiFail: false,
  isCreateRequest: false,
  isCreateSuccess: false,
  isCreateFail: false,
  verifyWithdrawCode: {},
  createWithdrawCode: {}
};

// ACTION : Verify Withdraw Fund
export function verifyWithdrawCodeRequest(params) {
  return {
    type: VERIFY_WITHDRAW_CODE_REQUEST,
    params
  };
}
export function verifyWithdrawCodeSuccess(payload) {
  return {
    type: VERIFY_WITHDRAW_CODE_SUCCESS,
    payload
  };
}
export function verifyWithdrawCodeFail() {
  return {
    type: VERIFY_WITHDRAW_CODE_FAIL
  };
}

// ACTION : Create Withdraw Fund
export function createWithdrawCodeRequest(params) {
  return {
    type: CREATE_WITHDRAW_CODE_REQUEST,
    params
  };
}
export function createWithdrawCodeSuccess(payload) {
  return {
    type: CREATE_WITHDRAW_CODE_SUCCESS,
    payload
  };
}
export function createWithdrawCodeFail() {
  return {
    type: CREATE_WITHDRAW_CODE_FAIL
  };
}

/* ------------------------------------------------------ */

export default function withdrawFundReducer(state, action) {
  if (!state) {
    state = { ...initialState };
  } else if (action.type === SET_STATE) {
    return { ...state, ...action.payload };
  }
  if (action.type === LOCATION_CHANGE) {
    return {
      ...state,
      ...{
        isApiRequest: false,
        isApiSuccess: false,
        isApiFail: false,
        verifyWithdrawCode: {},
        createWithdrawCode: {},
        isCreateRequest: false,
        isCreateSuccess: false,
        isCreateFail: false
      }
    };
  }
  if (action.type === VERIFY_WITHDRAW_CODE_REQUEST) {
    return {
      ...state,
      ...{
        isApiRequest: true,
        isApiSuccess: false,
        isApiFail: false,
        verifyWithdrawCode: {},
        createWithdrawCode: {},
        isCreateRequest: false,
        isCreateSuccess: false,
        isCreateFail: false
      }
    };
  }
  if (action.type === VERIFY_WITHDRAW_CODE_SUCCESS) {
    return {
      ...state,
      ...{
        isApiRequest: false,
        isApiSuccess: true,
        isApiFail: false,
        verifyWithdrawCode: action.payload
      }
    };
  }
  if (action.type === VERIFY_WITHDRAW_CODE_FAIL) {
    return {
      ...state,
      ...{
        isApiRequest: false,
        isApiSuccess: false,
        isApiFail: true
      }
    };
  }
  if (action.type === CREATE_WITHDRAW_CODE_REQUEST) {
    return {
      ...state,
      ...{
        isCreateRequest: true,
        isCreateSuccess: false,
        isCreateFail: false,
        createWithdrawCode: {},
        verifyWithdrawCode: {}
      }
    };
  }
  if (action.type === CREATE_WITHDRAW_CODE_SUCCESS) {
    return {
      ...state,
      ...{
        isCreateRequest: false,
        isCreateSuccess: true,
        isCreateFail: false,
        createWithdrawCode: action.payload
      }
    };
  }
  if (action.type === CREATE_WITHDRAW_CODE_FAIL) {
    return {
      ...state,
      ...{
        isCreateRequest: false,
        isCreateSuccess: false,
        isCreateFail: true
      }
    };
  }

  return state;
}

export const selectVerifyWithdrawData = (state) => state.withdrawFund;
export const selectCreateWithdrawData = (state) => state.withdrawFund;
