import { APIError, CustomError } from "commons/types";

import React from "react";
import { RouteConst } from "commons/consts";
import { log } from "./logger.util";
import { message } from "antd";
import { removeAuthCredential } from "./auth.util";
import { useSnackbar } from "notistack";

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

export const asyncErrorHandlerWrapper = async (asyncFunc) => {
  try {
    return await asyncFunc();
  } catch (error) {
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
    message.error("Something went wrong, please press F5 to refresh the page", 0);
  }
};

export const useAsyncErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();
  const asyncErrorHandlerWrapper = React.useCallback(
    async (asyncFunc) => {
      try {
        return await asyncFunc();
      } catch (error) {
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
        enqueueSnackbar("Something went wrong, please press F5 to refresh the page", {
          variant: "error",
          persist: true
        });
      }
    },
    [enqueueSnackbar]
  );
  return asyncErrorHandlerWrapper;
};
