import store from "store";
import { backendAPI } from "utils/httpAPI.util";
import { API_URI } from "commons/consts/system";

export class AuthService {
  static login = async (values) => {
    const result = await backendAPI.post(API_URI.LOGIN, { ...values, rememberMe: undefined });
    const { access_token } = result;
    const { rememberMe } = values;

    const userCredentials = {
      accessToken: access_token,
      rememberMe: rememberMe,
      createdDate: new Date()
    };
    await store.set("auth", userCredentials);
    return true;
  };

  static logout = async () => {
    await store.remove("auth");
    backendAPI.removeAuthHeader();
    return true;
  };
}
