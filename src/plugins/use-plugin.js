import React from "react";
import { ACCESS_HANDLER_MIDDLEWARE } from "./constants/middlewares";
import { PluginContext } from "./plugin-provider.comp";

export const usePlugin = () => {
  const { store } = React.useContext(PluginContext);
  const overrideSecureHandlers = React.useCallback(
    (handlers) => {
      const ctx = { handlers };
      store.executeMiddleware(ACCESS_HANDLER_MIDDLEWARE, ctx);
      return ctx.handlers;
    },
    [store]
  );

  return { overrideSecureHandlers };
};
