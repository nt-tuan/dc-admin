import { backendAPI } from "utils/httpAPI.util";
import store from "store";
import { ApiUriConsts } from "commons/consts/system/api-uri.const";

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
    const result = await backendAPI.get(ApiUriConsts.GET_ALL_USERS, { page, size, sort });
    return result;
  };

  static getAllBuyer = async ({ page, size, sort }) => {
    const result = await backendAPI.get(ApiUriConsts.GET_ALL_BUYERS, { page, size, sort });
    return result;
  };

  static getAllSeller = async ({ page, size, sort }) => {
    const result = await backendAPI.get(ApiUriConsts.GET_ALL_SELLERS, { page, size, sort });
    return result;
  };

  static suspendUser = async ({ companyId }) => {
    const result = await backendAPI.post(ApiUriConsts.SUSPEND_USER(companyId));
    return result;
  };

  static unsuspendUser = async ({ companyId }) => {
    const result = await backendAPI.post(
      ApiUriConsts.UNSUSPEND_USER.replace(":companyId", companyId)
    );
    return result;
  };

  static getAvailableBadges = async ({ companyId }) => {
    const result = await backendAPI.get(
      ApiUriConsts.GET_AVAILABLE_BADGES.replace(":companyId", companyId)
    );
    return result;
  };

  static assignBadge = async ({ companyId, type }) => {
    const result = await backendAPI.post(
      `${ApiUriConsts.ASSIGN_BADGE_TO_USER.replace(":companyId", companyId)}?type=${type}`
    );
    return result;
  };
}
