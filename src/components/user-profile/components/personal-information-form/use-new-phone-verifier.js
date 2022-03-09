import React from "react";
import { WRONG_VERIFICATION_CODE } from "@/commons/consts";
import { useMessage } from "@/hooks/use-message";
import { usePhoneCodeProvider } from "@/components/auth/providers/use-phone-code-provider";
import { useQueryClient } from "react-query";

export const useNewPhoneVerifier = ({ phone }) => {
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
      } else {
        message.error(WRONG_VERIFICATION_CODE);
      }
    });
  }, [queryClient, message, register]);
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
