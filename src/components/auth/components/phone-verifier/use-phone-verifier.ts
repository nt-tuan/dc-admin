import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import React from "react";

import { useMutation } from "react-query";
import { tfaSettingValidate } from "../../mappers";
import { PhoneVerifierConfig, VerifierHook } from "../../models/verifier";
import { createOTP } from "../../services/auth.service";

export const usePhoneVerifier: VerifierHook<PhoneVerifierConfig> = ({
  requestVerifyFn = createOTP,
  validateFn = tfaSettingValidate,
  onReady,
  onError,
  onSuccess,
  config
}) => {
  const [isVerifying, setIsVerifying] = React.useState(false);
  const { data, isLoading } = useUserProfile({
    enabled: Boolean(config?.enablePhoneConfirm)
  });

  const requestMutation = useMutation(requestVerifyFn, {
    onError,
    onSuccess: () => {
      setIsVerifying(true);
      if (onReady) onReady();
    }
  });

  const verifyMutation = useMutation(validateFn, {
    onSuccess: () => {
      setIsVerifying(false);
      if (onSuccess) onSuccess();
    },
    onError
  });

  const startVerify = () => {
    if (config?.enablePhoneConfirm && data == null) return;
    if (!data?.phoneVerified && config?.enablePhoneConfirm) {
      setIsVerifying(true);
      if (onReady) onReady();
      return;
    }
    requestMutation.mutate();
  };

  const verify = (code: string) => {
    verifyMutation.mutate(code);
  };

  const reset = () => {
    setIsVerifying(false);
  };

  return {
    phone: data?.phone,
    isLoading,
    isSubmitting: requestMutation.isLoading || verifyMutation.isLoading,
    isVerifying,
    startVerify,
    verify,
    reset
  };
};
