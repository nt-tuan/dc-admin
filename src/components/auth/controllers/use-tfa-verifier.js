import React from "react";
import { useErrorHandler } from "@/utils/error-handler.util";

export const VerifyStatusEnum = {
  VERIFIED: "VERIFIED",
  PENDING: "PENDING",
  NONE: "NONE"
};
export const useTwoFactorValidator = () => {
  const errorHandler = useErrorHandler();
  const [verifiedData, setVerifiedData] = React.useState();
  const [verifyStatus, setVerifyStatus] = React.useState(VerifyStatusEnum.NONE);

  const onReady = (values) => {
    setVerifiedData(values);
    setVerifyStatus(VerifyStatusEnum.PENDING);
  };
  const onSuccess = () => {
    setVerifyStatus(VerifyStatusEnum.VERIFIED);
  };
  const onError = (errorMessage) => {
    errorHandler.onError(errorMessage);
    setVerifyStatus(VerifyStatusEnum.PENDING);
  };
  const cancel = () => {
    setVerifyStatus(VerifyStatusEnum.NONE);
  };

  return {
    onReady,
    onSuccess,
    onError,
    verifiedData,
    verifyStatus,
    cancel
  };
};
