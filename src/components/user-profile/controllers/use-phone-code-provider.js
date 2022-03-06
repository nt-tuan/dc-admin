import { MethodEnum } from "../constants/tfa.enum";
import { WRONG_VERIFICATION_CODE } from "@/commons/consts";
import { newTwoFactorProvider } from "./two-factor-provider";
import { useMutation } from "react-query";
import { useSendPhoneCode } from "../services/use-send-phone-code";
import { verifyPhoneCode } from "../services/user-profile.service";

export const usePhoneCodeProvider = ({ onReady, onSuccess, onError, component, phone }) => {
  const { isLoading, refetchPhoneCode } = useSendPhoneCode({
    onSuccess: () => {
      onReady({ phone, open: true });
    }
  });
  const { mutate, isLoading: isSubmitting } = useMutation(verifyPhoneCode, {
    onSuccess: (data) => {
      if (data) {
        onSuccess(data);
        return;
      }
      onError(WRONG_VERIFICATION_CODE);
    },
    onError: () => {
      onError(WRONG_VERIFICATION_CODE);
    }
  });

  return newTwoFactorProvider({
    method: MethodEnum.SMS,
    setupButtonLabel: "Send Code",
    isPrepareing: isLoading,
    setup: refetchPhoneCode,
    mutate,
    isSubmitting,
    component
  });
};
