import {
  getGoogleAuthenticator,
  validateGoogleAuthenticator
} from "../services/user-profile.service";
import { useMutation, useQuery } from "react-query";

import { MethodEnum } from "../constants/tfa.enum";
import { newTwoFactorProvider } from "./two-factor-provider";

export const useGoogleAuthenticatorProvider = ({ onReady, onSuccess, onError, component }) => {
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
    isPrepareing: isLoading,
    setup: refetch,
    mutate,
    isSubmitting,
    component
  });
};
