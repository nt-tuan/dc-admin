import { backendAPI } from "@/utils/httpAPI.util";
import store from "store";
import { ApiPathConsts } from "@/commons/consts/system/api-paths/api-paths.const";
import { AUTH_LOCALSTORAGE_KEY } from "@/utils";

export class UserService {
  static #USER_MANAGEMENT_PREFIX = "/admin/users";

  static getCurrentAccount = async () => {
    const localStorageAuth = await store.get(AUTH_LOCALSTORAGE_KEY);
    if (localStorageAuth) {
      const { accessToken } = localStorageAuth;
      backendAPI.setAuthHeader(accessToken);
      return backendAPI.get("/me");
    }
    return undefined;
  };

  static getUserDetails = (username) => {
    return backendAPI.get(`${this.#USER_MANAGEMENT_PREFIX}/company-user-info?username=${username}`);
  };

  static removeBadge = async (type, id) => {
    await backendAPI.post(`${this.#USER_MANAGEMENT_PREFIX}/${id}/remove/badge/type?type=${type}`);
  };

  static getAllUsers = ({ page, size, sort }) => {
    return backendAPI.get(ApiPathConsts.GET_ALL_USERS, { page, size, sort });
  };

  static getAllBuyer = ({ page, size, sort }) => {
    return backendAPI.get(ApiPathConsts.GET_ALL_BUYERS, { page, size, sort });
  };

  static getAllSeller = ({ page, size, sort }) => {
    return backendAPI.get(ApiPathConsts.GET_ALL_SELLERS, { page, size, sort });
  };

  static suspendUser = ({ companyId }) => {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    return backendAPI.post(ApiPathConsts.SUSPEND_USER.replace(":companyId", companyId));
  };

  static unsuspendUser = ({ companyId }) => {
    return backendAPI.post(ApiPathConsts.UNSUSPEND_USER.replace(":companyId", companyId));
  };

  static getAvailableBadges = ({ companyId }) => {
    return backendAPI.get(ApiPathConsts.GET_AVAILABLE_BADGES.replace(":companyId", companyId));
  };

  static getAllBadges = () => {
    return backendAPI.get(ApiPathConsts.GET_ALL_BADGES);
  };

  static assignBadges = (data) => {
    const { companyId, badgeIdList } = data;
    let queryString = "";
    badgeIdList.forEach((id, index) => {
      const operator = index === 0 ? "?" : "&";
      queryString = `${queryString}${operator}badgeIdList=${id}`;
    });
    return backendAPI.post(`${ApiPathConsts.GET_ALL_BADGES}/${companyId}${queryString}`);
  };

  static manageMarketplaceCredit = async (companyId, isEnable) => {
    await backendAPI.post(
      `${this.#USER_MANAGEMENT_PREFIX}/${companyId}/update/marketplace-credit?isEnable=${isEnable}`
    );
  };

  static getAdminUsers = (params) => {
    return backendAPI.get("/users", params);
  };

  static addAdminUser = (user) => {
    return backendAPI.post("/admin/users", user);
  };

  static disableAdminUser = (userId) => {
    return backendAPI.patch(`/admin/users/${userId}/disable`);
  };

  static enableAdminUser = (userId) => {
    return backendAPI.patch(`/admin/users/${userId}/enable`);
  };

  static editAdminUser = (userId, payload) => {
    return backendAPI.put(`/admin/users/${userId}`, payload);
  };

  static deleteAdminUser = (userId) => {
    return backendAPI.delete(`/users/${userId}`);
  };
}
