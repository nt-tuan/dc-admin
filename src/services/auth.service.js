import store from "store";

export class AuthService {
  static login = async (values) => {
    // const result = await backendAPI.post(API_URI.LOGIN, { ...values, rememberMe: undefined });
    const access_token = "token";
    const { rememberMe } = values;

    const userCredentials = {
      accessToken: access_token,
      rememberMe: rememberMe,
      createdDate: new Date()
    };

    await localStorage.setItem("auth", userCredentials);
    return true;
  };

  static logout = async () => {
    await store.remove("auth");
    return true;
  };
}
