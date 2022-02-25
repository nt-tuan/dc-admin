import { ApiPathConsts } from "commons/consts";
import { backendAPI } from "utils/httpAPI.util";

export const updateAssetResource = async (type, formData) => {
  await backendAPI.post(ApiPathConsts.POST_MARKETPLACE_BRANDING_ASSET, formData, { type });
};
export const getOrganization = async () => {
  return backendAPI.get(ApiPathConsts.GET_ORGANIZATION);
};
export const updateOrganization = async (body) => {
  return backendAPI.put(ApiPathConsts.UPDATE_ORGANIZATION, body);
};

export const getAssetResource = async (type) => {
  return backendAPI.get(ApiPathConsts.GET_MARKETPLACE_BRANDING_ASSET, { type });
};
