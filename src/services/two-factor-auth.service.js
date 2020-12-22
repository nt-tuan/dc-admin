import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts";

export const check2FAStatus = async ({ browserId, password, username }) => {
  const status = await backendAPI.post(ApiPathConsts.CHECK_2FA_STATUS, {
    browserId,
    password,
    username
  });
  return status;
};

export const checkValidationCode = async ({ browserId, code, username, type }) => {
  const status = await backendAPI.post(ApiPathConsts.CHECK_VALIDATION_CODE, {
    browserId,
    code,
    username,
    type
  });
  return status;
};

export const forgetBrowser = async (browserId) => {
  const status = await backendAPI.post(`${ApiPathConsts.FORGET_BROWSER}`, browserId);
  return status;
};

export const sendValidationCode = async ({ browserId, username, type }) => {
  backendAPI.post(`${ApiPathConsts.SEND_VALIDATION_CODE}`, {
    browserId,
    username,
    type
  });
};

export const sendOTPCode = async (browserId) => {
  backendAPI.post(`${ApiPathConsts.SEND_VALIDATION_CODE}`, {
    browserId
  });
};

export const update2FASettings = async (settings) => {
  backendAPI.put(`${ApiPathConsts.UPDATE_USER_INFO}/tfa`, settings);
};

export const getGoogleAuthenticator = async () => {
  const result = backendAPI.get(`${ApiPathConsts.GET_GOOGLE_AUTHENTICATOR_QRCODE}`);
  return result;
};

export const validateGoogleAuthenticator = async (code) => {
  const result = backendAPI.put(`${ApiPathConsts.GET_GOOGLE_AUTHENTICATOR_QRCODE}`, code);
  return result;
};
