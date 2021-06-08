import React from "react";
import { getPlugins } from "utils/config.util";
import { PluginStore } from "./plugin-store";

export const PluginContext = React.createContext({ store: new PluginStore() });
export const storeInstance = new PluginStore();
const plugins = getPlugins();
for (const plugin of plugins) {
  storeInstance.install(plugin);
}

export const PlugginProvider = React.memo(({ children }) => {
  return (
    <PluginContext.Provider value={{ store: storeInstance }}>{children}</PluginContext.Provider>
  );
});
