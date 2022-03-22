import { getGoogleAuthenticator } from "../services/auth.service";
import { useVerifier, UseVerifierParameter } from "./use-verifier";

interface Params extends UseVerifierParameter {
  isSetup: boolean;
}
export const useGAVerifier = ({
  onError,
  onSuccess,
  onReady,
  validateFn,
  requestVerifyFn,
  isSetup
}: Params) => {
  return useVerifier({
    onReady,
    onSuccess,
    onError,
    requestVerifyFn: async () => {
      await requestVerifyFn();
      if (isSetup) {
        return getGoogleAuthenticator();
      }
    },
    validateFn
  });
};
