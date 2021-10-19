import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class FeatureFlagService {
  static getAllFeatureFlags = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_ALL_FEATURE_FLAGS);
    return result.content;
  };

  static updateFeatureFlag = async (featureId, enabled) => {
    await backendAPI.put(
      `${ApiPathConsts.UPDATE_FEATURE_FLAG.replace(":featureId", featureId)}?enabled=${enabled}`
    );
  };
}
