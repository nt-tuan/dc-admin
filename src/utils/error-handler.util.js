import { APIError, CustomError } from "@/commons/types";
import { log, popError } from "./logger.util";

import React from "react";
import { RouteConst } from "@/commons/consts";
import { globalSnackbarRef } from "@/components/snackbar-provider/snackbar-provider.comp";
import { removeAuthCredential } from "./auth.util";
import { useMessage } from "@/hooks/use-message";
import { API_ERRORS, API_ERROR_CODES } from "../commons/consts/system/api-error-code.const";

export const axiosErrorHandler = (err) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    log(err.response.data);
    log(err.response.status);
    log(err.response.headers);
    //Expected Errors
    const { errors } = err.response.data;
    if (errors) {
      throw new APIError(errors);
    }
    throw new CustomError(err.response.status, err.response.data);
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    log(err.request);
    log(err.message);
  } else {
    // Something happened in setting up the request that triggered an Error
    log(err.message);
  }
  throw new Error("Unexpected");
};

/**
 * @deprecated should be replaced by useAsyncErrorHandler to avoid global mutation
 */
export const asyncErrorHandlerWrapper = async (asyncFunc) => {
  try {
    return await asyncFunc();
  } catch (error) {
    if (error instanceof Error && error.message === "401") {
      removeAuthCredential().then(() => {
        window.location.href = RouteConst.LOGIN_ROUTE;
      });
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      log(error);
    }

    if (globalSnackbarRef.current?.enqueueSnackbar) {
      popError();
    }
  }
};
export const useErrorHandler = () => {
  const message = useMessage();
  const onError = React.useCallback(
    (error) => {
      if (error instanceof Error && error.message === "401") {
        removeAuthCredential().then(() => {
          window.location.href = RouteConst.LOGIN_ROUTE;
        });
        return;
      }
      if (process.env.NODE_ENV !== "production") {
        log(error);
      }
      if (error != null) {
        const { errMsg } = error;
        if (typeof errMsg === "string" && error.message === "400") {
          message.error(errMsg);
          return;
        }
      }
      message.error("Something went wrong, please press F5 to refresh the page", {
        persist: true
      });
    },
    [message]
  );
  return { onError };
};
export const useAsyncErrorHandler = () => {
  const message = useMessage();

  return React.useCallback(
    async (asyncFunc) => {
      try {
        return await asyncFunc();
      } catch (error) {
        if (error instanceof Error && error.message === "401") {
          removeAuthCredential().then(() => {
            window.location.href = RouteConst.LOGIN_ROUTE;
          });
          return;
        }
        if (process.env.NODE_ENV !== "production") {
          log(error);
        }
        message.error("Something went wrong, please press F5 to refresh the page", {
          persist: true
        });
      }
    },
    [message]
  );
};

export const parseServerError = (error) => {
  if (error?.errMsg?.error_message) {
    if (error?.errMsg?.error_message.includes("User not found"))
      return {
        message: API_ERRORS[API_ERROR_CODES.LOGIN_INVALID]
      };
    return {
      message: error?.errMsg?.error_message
    };
  }
  if (typeof error?.errors?.message === "string") {
    return { message: error?.errors?.message };
  }
  if (Array.isArray(error?.errors) && Array.isArray(error.errors[0])) {
    return {
      field: error.errors[0][0],
      message: API_ERRORS[error.errors[0][1]]
    };
  }
};
