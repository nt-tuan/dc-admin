import { backendAPI } from "@/utils/httpAPI.util";
import { ApiPathConsts } from "@/commons/consts";

export const check2FAStatus = ({ browserId, password, username }) => {
  return backendAPI.post(ApiPathConsts.CHECK_2FA_STATUS, {
    browserId,
    password,
    username
  });
};

export const checkValidationCode = ({ browserId, code, username, type }) => {
  return backendAPI.post(ApiPathConsts.CHECK_VALIDATION_CODE, {
    browserId,
    code,
    username,
    type
  });
};

export const forgetBrowser = (browserId) => {
  return backendAPI.post(`${ApiPathConsts.FORGET_BROWSER}`, browserId);
};

export const sendValidationCode = ({ browserId, username, type }) => {
  return backendAPI.post(`${ApiPathConsts.SEND_VALIDATION_CODE}`, {
    browserId,
    username,
    type
  });
};

export const sendOTPCode = (browserId) => {
  return backendAPI.post(`${ApiPathConsts.SEND_VALIDATION_CODE}`, {
    browserId
  });
};

export const update2FASettings = (settings) => {
  return backendAPI.put(`${ApiPathConsts.UPDATE_USER_INFO}/tfa`, settings);
};

export const getGoogleAuthenticator = () => {
  return backendAPI.get(`${ApiPathConsts.GET_GOOGLE_AUTHENTICATOR_QRCODE}`);
};

export const validateGoogleAuthenticator = (code) => {
  return backendAPI.put(`${ApiPathConsts.GET_GOOGLE_AUTHENTICATOR_QRCODE}`, code);
};
