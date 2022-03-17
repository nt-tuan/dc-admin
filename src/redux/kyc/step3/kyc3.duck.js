export const SET_STATE = "@@DTC/KYC3/SET_STATE";
export const GET_STEP3 = "@@DTC/KYC3/GET_STEP3";
export const SAVE_STEP3 = "@@DTC/KYC3/SAVE_STEP3";

const initialState = {
  loading: true,
  bankDetails: [
    {
      accountHolder: undefined,
      accountNumber: undefined,
      bankName: undefined,
      iban: undefined,
      nationality: undefined,
      currency: undefined,
      id: undefined,
      name: undefined,
      sortCode: undefined,
      swiftCode: undefined
    }
  ]
};

export default function KYC3Reducer(state = initialState, action) {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const selectBankDetails = (state) => state.kyc3.bankDetails;
export const selectLoadingState = (state) => state.kyc3.loading;
