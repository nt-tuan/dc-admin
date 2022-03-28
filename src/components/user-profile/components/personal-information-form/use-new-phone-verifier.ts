import { WRONG_VERIFICATION_CODE } from "@/commons/consts";
import { usePhoneVerifier } from "@/components/auth/components/phone-verifier/use-phone-verifier";
import { validateOTP } from "@/components/auth/services/auth.service";
import { useMessage } from "@/hooks/use-message";
import { useInvalidateUserProfiles } from "../../services/use-user-profile";
import { createOTP } from "../../services/user-profile.service";

interface Parameter {
  onSuccess: () => void;
}
export const useNewPhoneVerifier = ({ onSuccess }: Parameter) => {
  const invalidate = useInvalidateUserProfiles();
  const message = useMessage();
  const onReady = () => {};
  const onError = () => {
    message.error(WRONG_VERIFICATION_CODE);
  };
  const verifier = usePhoneVerifier({
    onReady,
    onError,
    validateFn: (code: string) => validateOTP({ code }),
    requestVerifyFn: createOTP,
    onSuccess: () => {
      invalidate();
      if (onSuccess) onSuccess();
    },
    config: {
      enablePhoneConfirm: false
    }
  });
  return {
    isLoading: verifier.isLoading,
    isVerifyingPhone: verifier.isVerifying,
    isSubmitting: verifier.isSubmitting,
    startVerifyingPhone: verifier.startVerify,
    verifyPhone: verifier.verify,
    cancelVerifyingPhone: verifier.reset
  };
};
