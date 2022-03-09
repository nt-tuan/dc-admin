import { ApiPathConsts } from "@/commons/consts";
import { backendAPI } from "@/utils/httpAPI.util";

export const requestPhoneCode = async () => {
  await backendAPI.get(ApiPathConsts.PHONE_VERIFICATION);
};

export const verifyPhoneCode = async (code) => {
  await backendAPI.post(ApiPathConsts.PHONE_VERIFICATION, null, { code });
  return true;
};

export const getGoogleAuthenticator = () => {
  return backendAPI.get(`${ApiPathConsts.GET_GOOGLE_AUTHENTICATOR_QRCODE}`);
};

export const validateGoogleAuthenticator = (code) => {
  return backendAPI.put(`${ApiPathConsts.GET_GOOGLE_AUTHENTICATOR_QRCODE}`, code);
};
