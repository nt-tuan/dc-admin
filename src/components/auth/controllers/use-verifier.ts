import { useMutation } from "react-query";
import React from "react";
import { VerifierHookParameter } from "../models/verifier";

export const useVerifier = <T>({
  onReady,
  onError,
  onSuccess,
  validateFn,
  requestVerifyFn = async () => {}
}: VerifierHookParameter<T>) => {
  const [isVerifying, setIsVerifying] = React.useState(false);
  const { isLoading, mutate: mutateRequest } = useMutation(requestVerifyFn, {
    onSuccess: () => {
      setIsVerifying(true);
      if (onReady) onReady();
    },
    onError
  });
  const startVerify = (options?: { onSuccess: () => void; onError: () => void }) => {
    mutateRequest(undefined, options);
  };
  const { mutate: verify, isLoading: isSubmitting } = useMutation(
    (code: string) => validateFn(code),
    {
      onSuccess,
      onError
    }
  );
  const reset = () => {
    setIsVerifying(false);
  };
  return {
    isVerifying,
    isLoading,
    startVerify,
    isSubmitting,
    verify,
    reset
  };
};
