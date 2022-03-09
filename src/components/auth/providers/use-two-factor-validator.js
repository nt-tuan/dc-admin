import React from "react";
import { useMessage } from "@/hooks/use-message";

export const VerifyStatusEnum = {
  VERIFIED: "VERIFIED",
  PENDING: "PENDING",
  NONE: "NONE"
};
export const useTwoFactorValidator = ({ selectedMethod }, providers) => {
  const message = useMessage();
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
    message.error(errorMessage);
    setVerifyStatus(VerifyStatusEnum.PENDING);
  };
  for (const key in providers) {
    const provider = providers[key];
    if (!provider.register) continue;
    provider.register("onReady", onReady);
    provider.register("onSuccess", onSuccess);
    provider.register("onError", onError);
  }

  const availableProviders = Object.keys(providers).filter((key) => !providers[key].isDisabled);
  const currentProvider = providers[selectedMethod];

  const sendCode = () => {
    if (!currentProvider) return;
    currentProvider.setup();
  };

  const verify = (...params) => {
    if (!currentProvider) return;
    currentProvider.mutate(...params);
  };
  const cancel = () => {
    setVerifyStatus(VerifyStatusEnum.NONE);
  };

  return {
    verifiedData,
    sendCode,
    verifyStatus,
    verify,
    cancel,
    providers,
    availableProviders,
    currentProvider
  };
};
