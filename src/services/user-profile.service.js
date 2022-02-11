import { ApiPathConsts } from "commons/consts";
import { backendAPI } from "utils/httpAPI.util";

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

export const getSecurityQuestions = async () => {
  const res = await backendAPI.get(ApiPathConsts.SECURITY_QUESTIONS);
  return res;
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
export const validatePasscode = async (data) => {
  const res = await backendAPI.post(ApiPathConsts.THREE_STEPS_PASSCODE, data);
  return res;
};

export const validateOTP = async (data) => {
  const res = await backendAPI.post(ApiPathConsts.THREE_STEPS_OTP, data);
  return res;
};

export const get3StepsData = async () => {
  const res = await backendAPI.get(ApiPathConsts.DATA_3_STEPS);
  return res;
};

export const createOTP = async () => {
  await backendAPI.put(ApiPathConsts.THREE_STEPS_OTP);
  return true;
};

export const getUserRebates = async () => {
  const res = await backendAPI.get(ApiPathConsts.USER_REBATES);
  return res;
};
