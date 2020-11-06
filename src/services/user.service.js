import { backendAPI } from "utils/httpAPI.util";
import store from "store";
import { ApiPathConsts } from "commons/consts/system/api-paths/api-paths.const";

export class UserService {
  static #USER_MANAGEMENT_PREFIX = "/users";

  static getCurrentAccount = async () => {
    const localStorageAuth = await store.get("auth");
    if (localStorageAuth) {
      const { accessToken } = localStorageAuth;
      backendAPI.setAuthHeader(accessToken);
      const curUser = await backendAPI.get("/me");
      return curUser;
    }
    return undefined;
  };

  static getUserDetails = async (username) => {
    const result = await backendAPI.get(
      `${this.#USER_MANAGEMENT_PREFIX}/company-user-info?username=${username}`
    );
    return result;
  };

  static removeBadge = async (type, id) => {
    await backendAPI.post(`${this.#USER_MANAGEMENT_PREFIX}/${id}/remove/badge/type?type=${type}`);
  };

  static getAllUsers = async ({ page, size, sort }) => {
    const result = await backendAPI.get(ApiPathConsts.GET_ALL_USERS, { page, size, sort });
    return result;
  };

  static getAllBuyer = async ({ page, size, sort }) => {
    const result = await backendAPI.get(ApiPathConsts.GET_ALL_BUYERS, { page, size, sort });
    return result;
  };

  static getAllSeller = async ({ page, size, sort }) => {
    const result = await backendAPI.get(ApiPathConsts.GET_ALL_SELLERS, { page, size, sort });
    return result;
  };

  static suspendUser = async ({ companyId }) => {
    const result = await backendAPI.post(
      ApiPathConsts.SUSPEND_USER.replace(":companyId", companyId)
    );
    return result;
  };

  static unsuspendUser = async ({ companyId }) => {
    const result = await backendAPI.post(
      ApiPathConsts.UNSUSPEND_USER.replace(":companyId", companyId)
    );
    return result;
  };

  static getAvailableBadges = async ({ companyId }) => {
    const result = await backendAPI.get(
      ApiPathConsts.GET_AVAILABLE_BADGES.replace(":companyId", companyId)
    );
    return result;
  };

  static getAllBadges = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_ALL_BADGES);
    return result;
  };

  static assignBadges = async (data) => {
    const { companyId, badgeIdList } = data;
    let queryString = "";
    badgeIdList.forEach((id, index) => {
      const operator = index === 0 ? "?" : "&";
      queryString = `${queryString}${operator}badgeIdList=${id}`;
    });
    const result = await backendAPI.post(
      `${ApiPathConsts.GET_ALL_BADGES}/${companyId}${queryString}`
    );
    return result;
  };

  static manageMarketplaceCredit = async (companyId, isEnable) => {
    await backendAPI.post(
      `${this.#USER_MANAGEMENT_PREFIX}/${companyId}/update/marketplace-credit?isEnable=${isEnable}`
    );
  };
}
