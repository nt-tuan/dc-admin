import faviconPlaceholder from "@/assets/images/favicon-placeholder.png";
import landingPlaceholder from "@/assets/images/landing-placeholder.png";
import logoPlaceholder from "@/assets/images/logo-placeholder.png";

export const SET_STATE = "@@DTC/CONFIG/SET_STATE_CONFIG";
export const LOAD_ASSET = "@@DTC/CONFIG/LOAD_ASSET";
export const LOAD_ASSETS = "@@DTC/CONFIG/LOAD_ASSETS";
export const LOAD_MARKETPLACE_NAME = "@@DTC/CONFIG/LOAD_MARKETPLACE_NAME";

export const initialState = {
  brandingAsset: {
    logo: logoPlaceholder,
    landing: landingPlaceholder,
    favicon: faviconPlaceholder
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
