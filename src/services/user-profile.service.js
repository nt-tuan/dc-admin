import { ApiPathConsts } from "@/commons/consts";
import { backendAPI } from "@/utils/httpAPI.util";

export const getUserProfile = async () => backendAPI.get(ApiPathConsts.UPDATE_USER_INFO);

export const updateProfile = async (values) => {
  await backendAPI.put(ApiPathConsts.UPDATE_USER_INFO, values);
};

export const requestPhoneCode = async () => {
  await backendAPI.get(ApiPathConsts.PHONE_VERIFICATION);
};

export const verifyPhoneCode = async (code) => {
  await backendAPI.post(ApiPathConsts.PHONE_VERIFICATION, null, { code });
  return true;
};

export const updateNotificationChannel = async (values) => {
  await backendAPI.put(ApiPathConsts.NOTIFICATION_SETTING, values);
};

export const getSecurityQuestions = () => {
  return backendAPI.get(ApiPathConsts.SECURITY_QUESTIONS);
};

export const createSecurityQuestions = async (data) => {
  await backendAPI.post(ApiPathConsts.SECURITY_ANSWER, data);
  return true;
};

export const validateSecurityQuestions = async (data) => {
  await backendAPI.put(ApiPathConsts.SECURITY_ANSWER, data);
  return true;
};

export const createPasscode = async (data) => {
  await backendAPI.put(ApiPathConsts.THREE_STEPS_PASSCODE, data);
  return true;
};
export const validatePasscode = (data) => {
  return backendAPI.post(ApiPathConsts.THREE_STEPS_PASSCODE, data);
};

export const validateOTP = (data) => {
  return backendAPI.post(ApiPathConsts.THREE_STEPS_OTP, data);
};

export const get3StepsData = () => {
  return backendAPI.get(ApiPathConsts.DATA_3_STEPS);
};

export const createOTP = async () => {
  await backendAPI.put(ApiPathConsts.THREE_STEPS_OTP);
  return true;
};

export const getUserRebates = () => {
  return backendAPI.get(ApiPathConsts.USER_REBATES);
};
