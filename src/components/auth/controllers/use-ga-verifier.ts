import React from "react";
import { tfaSettingValidate } from "../mappers";
import { GAVerifierConfig, VerifierHook } from "../models/verifier";
import { useVerifier } from "./use-verifier";

export const useGAVerifier: VerifierHook<GAVerifierConfig> = ({
  onError,
  onSuccess,
  onReady,
  validateFn = tfaSettingValidate,
  requestVerifyFn,
  config
}) => {
  const [isVerifying, setIsVerifying] = React.useState(false);
  const verifier = useVerifier({
    onReady: () => {
      setIsVerifying(true);
      if (onReady) onReady();
    },
    onSuccess,
    onError,
    requestVerifyFn,
    validateFn,
    config
  });
  return {
    ...verifier,
    isVerifying,
    setIsVerifying
  };
};
