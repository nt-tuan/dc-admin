import { log, popError } from "./logger.util";

import { RouteConst } from "commons/consts";
import { removeAuthCredential } from "./auth.util";

export const handleSagaError = (error) => {
  if (error instanceof Error) {
    if (error.message === "401") {
      removeAuthCredential().then(() => {
        window.location.href = RouteConst.LOGIN_ROUTE;
      });
      return;
    }
  }
  if (process.env.NODE_ENV !== "production") {
    log(error);
  }
  popError();
};
