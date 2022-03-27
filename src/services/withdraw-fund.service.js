import { ApiPathConsts } from "@/commons/consts";
import { backendAPI } from "@/utils/httpAPI.util";

// Custom api validateOTP
export const customValidateOTP = (data) => {
  return backendAPI.post(ApiPathConsts.THREE_STEPS_OTP, { code: data });
};

// Api : Create a withdrawal request
export const createWithdrawFund = (data) => {
  return backendAPI.post(ApiPathConsts.CREATE_WITHDRAW_FUND, data);
};
