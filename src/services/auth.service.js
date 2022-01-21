import store from "store";
import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";
import { AUTH_LOCALSTORAGE_KEY } from "utils";

export class AuthService {
  static login = async (values) => {
    const result = await backendAPI.post(ApiPathConsts.LOGIN, { ...values, rememberMe: undefined });
    const { access_token } = result;
    const { rememberMe } = values;

    const userCredentials = {
      accessToken: access_token,
      rememberMe: rememberMe,
      createdDate: new Date()
    };
    await store.set(AUTH_LOCALSTORAGE_KEY, userCredentials);
    return true;
  };

  static logout = async () => {
    await store.remove(AUTH_LOCALSTORAGE_KEY);
    backendAPI.removeAuthHeader();
    return true;
  };
  static changePassword = async (data) => {
    await backendAPI.post(ApiPathConsts.CHANGE_PASSWORD, data);
    return true;
  };
  static verifyConfirmEmailToken = async (data) => {
    return backendAPI.get(ApiPathConsts.GET_EMAIL_VERIFICATION, data);
  };
  static sendResetPwEmail = async (email) => {
    await backendAPI.post(`${ApiPathConsts.SEND_RESET_PW_LINK}?email=${email}`);
    return true;
  };
  static resetPassword = async (values) => {
    await backendAPI.post(ApiPathConsts.RESET_PW, values);
    return true;
  };
  static verifyResetPasswordToken = async (token) => {
    await backendAPI.get(ApiPathConsts.CHECK_RESET_PW_TOKEN, { token });
    return true;
  };
}
