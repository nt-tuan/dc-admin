import React from "react";
import { storeInstance } from "./plugin-provider.comp";
export const withPlugin = (Component) => (props) => {
  if (storeInstance.hasComponent(Component)) {
    const PluginComponent = storeInstance.getComponent(Component);
    return <PluginComponent {...props} />;
  }
  return <Component {...props} />;
};
