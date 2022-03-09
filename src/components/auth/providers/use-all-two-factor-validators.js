import { GoogleAuthenticatorModal } from "../components/google-authenticator-modal";
import { PhoneOTPModal } from "../components/phone-otp-modal";
import { useGoogleAuthenticatorProvider } from "./use-google-authenticator-provider";
import { usePhoneCodeProvider } from "./use-phone-code-provider";
import { useTwoFactorValidator } from "./use-two-factor-validator";

export const useAllTwoFactorValidator = ({ selectedMethod, phone }) => {
  const phoneCodeProvider = usePhoneCodeProvider({
    phone,
    component: PhoneOTPModal
  });
  const gaProvider = useGoogleAuthenticatorProvider({
    component: GoogleAuthenticatorModal
  });
  const providers = {
    [phoneCodeProvider.method]: phoneCodeProvider,
    [gaProvider.method]: gaProvider
  };
  return useTwoFactorValidator({ selectedMethod }, providers);
};
