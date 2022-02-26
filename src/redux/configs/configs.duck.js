import { getAssetURL } from "@/utils/config.util";

export const SET_STATE = "@@DTC/CONFIG/SET_STATE_CONFIG";
export const LOAD_ASSET = "@@DTC/CONFIG/LOAD_ASSET";
export const LOAD_ASSETS = "@@DTC/CONFIG/LOAD_ASSETS";
export const LOAD_MARKETPLACE_NAME = "@@DTC/CONFIG/LOAD_MARKETPLACE_NAME";

export const initialState = {
  brandingAsset: {
    logo: getAssetURL("/images/logo-placeholder.png"),
    landing: getAssetURL("/images/distichain.png"),
    favicon: getAssetURL("/favicon/favicon.ico")
  }
};

export default function configsReducer(state, action) {
  if (!state) {
    state = { ...initialState };
  }

  if (action.type === SET_STATE) {
    return { ...state, ...action.payload };
  }
  return state;
}

export const mappingTypeAndKeyStateBranding = {
  LOGO: "logo",
  MARKETPLACE_LANDING_PAGE_IMAGE: "landing",
  FAVICON: "favicon"
};
export const selectBrandingAssetsData = (state) => state.configs.brandingAsset;
export const selectMarketPlaceName = (state) => state.configs.marketPlaceName;
