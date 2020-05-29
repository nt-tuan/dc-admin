import { backendAPI } from "utils/httpAPI.util";

export class UserService {
  static getCurrentAccount = async () => {
    const localStorageAuth = localStorage.getItem("auth");

    if (localStorageAuth) {
      const { accessToken } = JSON.parse(localStorageAuth);
      backendAPI.setAuthHeader(accessToken);
      return true;
    }
    return false;
  };
}
