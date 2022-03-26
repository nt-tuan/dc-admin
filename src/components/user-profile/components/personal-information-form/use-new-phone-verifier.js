import { WRONG_VERIFICATION_CODE } from "@/commons/consts";
import { usePhoneVerifier } from "@/components/auth/components/phone-verifier/use-phone-verifier";
import { useMessage } from "@/hooks/use-message";
import React from "react";
import { useInvalidateUserProfiles } from "../../services/use-user-profile";

export const useNewPhoneVerifier = ({ phone, onSuccess }) => {
  const invalidate = useInvalidateUserProfiles();
  const message = useMessage();
  const onReady = () => {
    setIsVerifyingPhone(true);
  };
  const onError = () => {
    message.error(WRONG_VERIFICATION_CODE);
  };
  const verifier = usePhoneVerifier({
    onReady,
    onError,
    onSuccess: (data) => {
      setIsVerifyingPhone(false);
      invalidate();
      if (onSuccess) onSuccess();
    }
  });

  const [isVerifyingPhone, setIsVerifyingPhone] = React.useState(false);

  const cancelVerifyingPhone = () => {
    setIsVerifyingPhone(false);
  };
  return {
    isLoading: verifier.isLoading,
    isVerifyingPhone,
    isSubmitting: verifier.isSubmitting,
    startVerifyingPhone: verifier.startConfirmPhone,
    verifyPhone: verifier.verify,
    cancelVerifyingPhone
  };
};
