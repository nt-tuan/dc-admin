import { useMutation, useQueryClient } from "react-query";

import React from "react";
import { WRONG_VERIFICATION_CODE } from "@/commons/consts";
import { useMessage } from "@/hooks/use-message";
import { useSendPhoneCode } from "../services/use-send-phone-code";
import { verifyPhoneCode } from "../services/auth.service";

export const usePhoneVerify = () => {
  const message = useMessage();
  const [isVerifyingPhone, setIsVerifyingPhone] = React.useState(false);
  const { isLoading, refetchPhoneCode } = useSendPhoneCode({
    onSuccess: () => {
      setIsVerifyingPhone(true);
    }
  });
  const queryClient = useQueryClient();
  const startVerifyingPhone = () => {
    refetchPhoneCode();
  };
  const cancelVerifyingPhone = () => {
    setIsVerifyingPhone(false);
  };
  const { mutate, isLoading: isSubmitting } = useMutation(verifyPhoneCode, {
    onSuccess: (data) => {
      if (data) {
        cancelVerifyingPhone();
        queryClient.invalidateQueries(["me"]);
      } else {
        message.error(WRONG_VERIFICATION_CODE);
      }
    },
    onError: () => {
      message.error(WRONG_VERIFICATION_CODE);
    }
  });

  return {
    isLoading,
    isVerifyingPhone,
    isSubmitting,
    startVerifyingPhone,
    verifyPhone: mutate,
    cancelVerifyingPhone
  };
};
