import { useMutation } from "react-query";
import React from "react";
import type { Verifier } from "../models/verifier";

export interface UseVerifierParameter<T = undefined> {
  onReady: () => void;
  onError: () => void;
  onSuccess: (values: T) => void;
  validateFn: (code: string) => Promise<unknown>;
  requestVerifyFn: any;
}
export type UseVerifierFunction<T = undefined> = (p: UseVerifierParameter<T>) => Verifier<T>;
export const useVerifier: UseVerifierFunction = <T>({
  onReady,
  onError,
  onSuccess,
  validateFn,
  requestVerifyFn
}: UseVerifierParameter<T>) => {
  const [data, setData] = React.useState<T>();
  const { isLoading, mutate: startVerify } = useMutation(requestVerifyFn, {
    onSuccess: (values: T) => {
      setData(values);
      onReady();
    },
    onError
  });
  const { mutate: verify, isLoading: isSubmitting } = useMutation(
    (code: string) => validateFn(code),
    {
      onSuccess,
      onError
    }
  );
  return {
    isLoading,
    startVerify,
    isSubmitting,
    verify,
    data
  };
};
