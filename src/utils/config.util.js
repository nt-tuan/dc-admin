const tryGetJSONValue = (jsonString, defaultValue) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
};

export const getPlugins = () => {
  const pluginsJSON = process.env?.REACT_APP_PLUGINS;
  const plugins = tryGetJSONValue(pluginsJSON, []);
  return plugins;
};
