import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class FeatureFlagService {
  static getAllFeatureFlags = async () => {
    return await backendAPI.get(ApiPathConsts.GET_ALL_FEATURE_FLAGS);
  };

  static updateFeatureFlag = async (featureId, enabled) => {
    await backendAPI.put(
      `${ApiPathConsts.UPDATE_FEATURE_FLAG.replace(":featureId", featureId)}?enabled=${enabled}`
    );
  };
}
