const tryGetJSONValue = (jsonString, defaultValue) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
};

export const getPlugins = () => {
  const pluginsJSON = window._env_?.REACT_APP_PLUGINS;
  return tryGetJSONValue(pluginsJSON, []);
};
export const getCompanyShortName = () => {
  return window._env_.REACT_COMPANY_SHORT_NAME ?? "";
};
export const getAPIEndPoint = () => window._env_.REACT_APP_API_ENDPOINT;
export const getMarketplaceEndPoint = () => window._env_.REACT_APP_CCC_ENDPOINT;
export const getBadgeNumbers = () => [
  window._env_.REACT_APP_NUMBER_BADGE_NONE,
  window._env_.REACT_APP_NUMBER_BADGE_1,
  window._env_.REACT_APP_NUMBER_BADGE_2,
  window._env_.REACT_APP_NUMBER_BADGE_3,
  window._env_.REACT_APP_NUMBER_BADGE_4,
  window._env_.REACT_APP_NUMBER_BADGE_5
];
export const getBadgeValues = () => [
  window._env_.REACT_APP_VALUE_BADGE_NONE,
  window._env_.REACT_APP_VALUE_BADGE_1,
  window._env_.REACT_APP_VALUE_BADGE_2,
  window._env_.REACT_APP_VALUE_BADGE_3,
  window._env_.REACT_APP_VALUE_BADGE_4,
  window._env_.REACT_APP_VALUE_BADGE_5
];
export const getDefaultCurrency = () => {
  return window._env_.REACT_APP_DEFAULT_CURRENCY_TYPE ?? "USD";
};
export const getCompanyName = () => {
  const value = localStorage.getItem("REACT_APP_COMPANY_NAME");
  if (value) {
    return value;
  }
  return window._env_.REACT_APP_COMPANY_NAME;
};
export const getHotjarID = () => {
  return window._env_.REACT_APP_HOTJAR_ID;
};
export const getHotjarSV = () => {
  return window._env_.REACT_APP_HOTJAR_SV;
};
export const getAssetURL = (path) => {
  return (window._env_?.ASSET_URL ?? "/admin") + (path ?? "");
};
export const getAppVersion = () => {
  return window._env_?.APPLICATION_VERSION ?? "v0.0.0";
};
