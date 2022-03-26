import React from "react";
import { useErrorHandler } from "@/utils/error-handler.util";

export const VerifyStatusEnum = {
  VERIFIED: "VERIFIED",
  PENDING: "PENDING",
  NONE: "NONE"
};
export const useTFAState = (callbacks) => {
  const errorHandler = useErrorHandler();
  const [verifiedData, setVerifiedData] = React.useState<any>();
  const [verifyStatus, setVerifyStatus] = React.useState(VerifyStatusEnum.NONE);
  const [tfaMethod, setTfaMethod] = React.useState();

  const start = (method) => {
    setTfaMethod(method);
  };

  const onReady = (values) => {
    setVerifiedData(values);
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
    errorHandler.onError(errorMessage);
    setVerifyStatus(VerifyStatusEnum.PENDING);
    if (callbacks?.onError) {
      callbacks?.onError();
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
    verifiedData,
    verifyStatus,
    cancel
  };
};
