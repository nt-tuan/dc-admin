import { backendAPI } from "utils/httpAPI.util";
import store from "store";
import { API_URI } from "commons/consts/system";

export class UserService {
  static getCurrentAccount = async () => {
    const localStorageAuth = await store.get("auth");
    if (localStorageAuth) {
      const { accessToken } = localStorageAuth;
      backendAPI.setAuthHeader(accessToken);
      return true;
    }
    return false;
  };

  static getAllUsers = async ({ page, size, sort }) => {
    const result = await backendAPI.get(API_URI.GET_ALL_USERS, { page, size, sort });
    return result;
  };

  static getAllBuyer = async ({ page, size, sort }) => {
    const result = await backendAPI.get(API_URI.GET_ALL_BUYERS, { page, size, sort });
    return result;
  };

  static getAllSeller = async ({ page, size, sort }) => {
    const result = await backendAPI.get(API_URI.GET_ALL_SELLERS, { page, size, sort });
    return result;
  };

  static suspendUser = async ({ companyId }) => {
    const result = await backendAPI.post(API_URI.SUSPEND_USER.replace(":companyId", companyId));
    return result;
  };

  static unsuspendUser = async ({ companyId }) => {
    const result = await backendAPI.post(API_URI.UNSUSPEND_USER.replace(":companyId", companyId));
    return result;
  };

  static getAvailableBadges = async ({ companyId }) => {
    const result = await backendAPI.get(
      API_URI.GET_AVAILABLE_BADGES.replace(":companyId", companyId)
    );
    return result;
  };

  static assignBadge = async ({ companyId }) => {
    const result = await backendAPI.post(
      API_URI.ASSIGN_BADGE_TO_USER.replace(":companyId", companyId)
    );
    return result;
  };
}
