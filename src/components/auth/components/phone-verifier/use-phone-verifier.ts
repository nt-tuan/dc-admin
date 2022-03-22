import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import React from "react";

import { useMutation } from "react-query";
import { createOTP, validateOTP as validateOTPRequest } from "../../services/auth.service";

const STATUS = {
  NOT_VERIFIED: "NOT_VERIFIED",
  CONFIRM_PHONE: "CONFIRM_PHONE",
  VERIFYING: "VERIFYING",
  VERIFIED: "VERIFIED"
};

export const usePhoneVerifier = ({
  requestVerifyFn = createOTP,
  validateFn = (code: string) => validateOTPRequest({ code }),
  onReady,
  onError,
  onSuccess
}) => {
  const [status, setStatus] = React.useState(STATUS.NOT_VERIFIED);
  const { data, isLoading } = useUserProfile();

  const requestMutation = useMutation(requestVerifyFn, {
    onError,
    onSuccess: () => {
      setStatus(STATUS.VERIFYING);
      onReady();
    }
  });

  const verifyMutation = useMutation(validateFn, {
    onSuccess: () => {
      setStatus(STATUS.VERIFIED);
      onSuccess();
    },
    onError
  });

  const startVerify = () => {
    if (data == null) return;
    if (!data.phoneVerified) {
      setStatus(STATUS.CONFIRM_PHONE);
      onReady();
      return;
    }
    requestMutation.mutate();
  };

  const startConfirmPhone = () => {
    requestMutation.mutate();
  };

  const verify = (code) => {
    verifyMutation.mutate(code);
  };

  const reset = () => {
    setStatus(STATUS.NOT_VERIFIED);
  };

  const isConfirmingPhone = status === STATUS.CONFIRM_PHONE;
  const isVerifying = status === STATUS.VERIFYING;

  return {
    phone: data?.phone ?? "",
    isLoading,
    isSubmitting: requestMutation.isLoading || verifyMutation.isLoading,
    isConfirmingPhone,
    isVerifying,
    startVerify,
    verify,
    startConfirmPhone,
    reset
  };
};
