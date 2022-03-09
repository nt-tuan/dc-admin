import { getGoogleAuthenticator, validateGoogleAuthenticator } from "../services/auth.service";
import { useMutation, useQuery } from "react-query";

import { MethodEnum } from "../services/tfa.enum";
import { newTwoFactorProvider } from "./two-factor-provider";
import { useCallbackEvents } from "./use-callbacks";

export const useGoogleAuthenticatorProvider = ({ component }) => {
  const [{ onReady, onSuccess, onError }, register] = useCallbackEvents();
  const { isLoading, refetch } = useQuery(["google-authenticator"], getGoogleAuthenticator, {
    enabled: false,
    onSuccess: (values) => {
      onReady({ ...values, open: true });
    },
    onError
  });
  const { mutate, isLoading: isSubmitting } = useMutation(validateGoogleAuthenticator, {
    onSuccess,
    onError
  });
  return newTwoFactorProvider({
    method: MethodEnum.GA,
    setupButtonLabel: "Setup Google Authenticator",
    isPreparing: isLoading,
    setup: refetch,
    mutate,
    isSubmitting,
    component,
    register
  });
};
