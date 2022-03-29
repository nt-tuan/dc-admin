import React from "react";
import { useErrorHandler } from "@/utils/error-handler.util";

export const VerifyStatusEnum = {
  VERIFIED: "VERIFIED",
  PENDING: "PENDING",
  NONE: "NONE"
};
export const useTFAState = (callbacks) => {
  const errorHandler = useErrorHandler();
  const [verifyStatus, setVerifyStatus] = React.useState(VerifyStatusEnum.NONE);
  const [tfaMethod, setTfaMethod] = React.useState<string>();

  const start = (method: string | undefined) => {
    setTfaMethod(method);
  };

  const onReady = () => {
    setVerifyStatus(VerifyStatusEnum.PENDING);
    if (callbacks?.onReady) {
      callbacks.onReady();
    }
  };
  const onSuccess = () => {
    setVerifyStatus(VerifyStatusEnum.VERIFIED);
    if (callbacks?.onSuccess) {
      callbacks.onSuccess();
    }
  };
  const onError = (errorMessage) => {
    setVerifyStatus(VerifyStatusEnum.PENDING);
    if (callbacks?.onError) {
      callbacks?.onError(errorMessage);
    } else {
      errorHandler.onError(errorMessage);
    }
  };
  const cancel = () => {
    setVerifyStatus(VerifyStatusEnum.NONE);
  };
  const isVerifying = verifyStatus === VerifyStatusEnum.PENDING;

  return {
    isVerifying,
    start,
    method: tfaMethod,
    onReady,
    onSuccess,
    onError,
    verifyStatus,
    cancel
  };
};
