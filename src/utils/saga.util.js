import { ROUTES } from "commons/consts";
import { log } from "./logger.util";
import { removeAuthCredential } from "./auth.util";
import { message } from "antd";

export const handleSagaError = (error) => {
  if (error instanceof Error) {
    if (error.message === "401") {
      removeAuthCredential().then(() => {
        window.location.href = ROUTES.LOGIN_ROUTE;
      });
      return;
    }
  }
  if (process.env.NODE_ENV !== "production") {
    log(error);
  }
  message.error("Something went wrong, please press F5 to refresh the page", 0);
};
