import { WRONG_VERIFICATION_CODE } from "@/commons/consts";
import { usePhoneCodeProvider } from "@/components/auth/providers/use-phone-code-provider";
import { useMessage } from "@/hooks/use-message";
import React from "react";
import { useQueryClient } from "react-query";

export const useNewPhoneVerifier = ({ phone, onSuccess }) => {
  const { register, ...phoneProvider } = usePhoneCodeProvider({ phone });
  const queryClient = useQueryClient();
  const message = useMessage();
  const [isVerifyingPhone, setIsVerifyingPhone] = React.useState(false);
  React.useEffect(() => {
    register("onReady", () => {
      setIsVerifyingPhone(true);
    });
    register("onError", () => {
      message.error(WRONG_VERIFICATION_CODE);
    });
    register("onSuccess", (data) => {
      if (data) {
        setIsVerifyingPhone(false);
        queryClient.invalidateQueries(["me"]);
        if (onSuccess) onSuccess();
      } else {
        message.error(WRONG_VERIFICATION_CODE);
      }
    });
  }, [queryClient, onSuccess, message, register]);
  const cancelVerifyingPhone = () => {
    setIsVerifyingPhone(false);
  };
  return {
    isLoading: phoneProvider.isPreparing,
    isVerifyingPhone,
    isSubmitting: phoneProvider.isSubmitting,
    startVerifyingPhone: phoneProvider.setup,
    verifyPhone: phoneProvider.mutate,
    cancelVerifyingPhone
  };
};
