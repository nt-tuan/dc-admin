import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export const getOrganizationName = async () => {
  return backendAPI.get(ApiPathConsts.GET_ORGANIZATION);
};

export const updateOrganizationName = async (payload) => {
  return backendAPI.put(ApiPathConsts.GET_ORGANIZATION, payload);
};
