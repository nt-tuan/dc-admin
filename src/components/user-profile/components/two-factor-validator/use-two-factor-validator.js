import { GoogleAuthenticatorModal } from "../google-authenticator-modal";
import { PhoneOTPModal } from "../phone-otp-modal";
import React from "react";
import { useGoogleAuthenticatorProvider } from "../../controllers/use-google-authenticator-provider";
import { useMessage } from "@/hooks/use-message";
import { usePhoneCodeProvider } from "../../controllers/use-phone-code-provider";

export const useTwoFactorValidator = ({ selectedMethod, phone }) => {
  const message = useMessage();
  const [verifiedTfaType, setVerifiedTfaType] = React.useState();
  const [verifiedData, setVerifiedData] = React.useState();
  const [verifyStatus, setVerifyStatus] = React.useState(false);
  const onReady = (values) => {
    setVerifiedTfaType(selectedMethod);
    setVerifiedData(values);
    setVerifyStatus(false);
  };
  const onSuccess = () => {
    setVerifyStatus(true);
  };
  const onError = (errorMessage) => {
    message.error(errorMessage);
    setVerifyStatus(false);
  };
  const phoneCodeProvider = usePhoneCodeProvider({
    onReady,
    onSuccess,
    onError,
    phone,
    component: PhoneOTPModal
  });
  const gaProvider = useGoogleAuthenticatorProvider({
    onReady,
    onSuccess,
    component: GoogleAuthenticatorModal
  });

  const providers = {
    [phoneCodeProvider.method]: phoneCodeProvider,
    [gaProvider.method]: gaProvider
  };

  const currentProvider = providers[selectedMethod];

  const sendCode = () => {
    if (!currentProvider) return;
    currentProvider.setup();
  };

  const verify = (...params) => {
    if (!currentProvider) return;
    currentProvider.mutate(...params);
  };
  const cancel = () => {
    setVerifyStatus(false);
  };

  return {
    verifiedTfaType,
    verifiedData,
    isLoading: currentProvider?.isPrepareing,
    isSubmitting: currentProvider?.isSubmitting,
    sendCode,
    verifyStatus,
    verify,
    cancel,
    providers,
    currentProvider
  };
};
