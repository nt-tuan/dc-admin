import { WRONG_VERIFICATION_CODE } from "@/commons/consts";
import Typography from "@mui/material/Typography";
import { useMutation } from "react-query";

import { verifyPhoneCode } from "../services/auth.service";
import { MethodEnum } from "../services/tfa.enum";
import { useSendPhoneCode } from "../services/use-send-phone-code";
import { newTwoFactorProvider } from "./two-factor-provider";
import { useCallbackEvents } from "./use-callbacks";

export const usePhoneCodeProvider = ({ component, phone }) => {
  const [{ onReady, onSuccess, onError }, register] = useCallbackEvents();

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
  const isDisabled = phone == null;

  return newTwoFactorProvider({
    method: MethodEnum.SMS,
    setupButtonLabel: "Send Code",
    helperText: (
      <Typography variant="body2">
        A one-time verification code will be sent to <strong>{phone}</strong>
      </Typography>
    ),
    isPreparing: isLoading,
    setup: refetchPhoneCode,
    mutate,
    isSubmitting,
    component,
    isDisabled,
    register
  });
};
