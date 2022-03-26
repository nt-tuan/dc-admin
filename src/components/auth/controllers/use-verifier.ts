import { useMutation } from "react-query";
import React from "react";

export interface UseVerifierParameter<T = undefined> {
  onReady: (values?: any) => void;
  onError: (error?: any) => void;
  onSuccess: (values?: T) => void;
  validateFn: (code: string) => Promise<unknown>;
  requestVerifyFn: any;
}
export const useVerifier = <T>({
  onReady,
  onError,
  onSuccess,
  validateFn,
  requestVerifyFn
}: UseVerifierParameter<T>) => {
  const [data, setData] = React.useState<T>();
  const { isLoading, mutate: mutateRequest } = useMutation(requestVerifyFn, {
    onSuccess: (values: T) => {
      setData(values);
      onReady(values);
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
  return {
    isLoading,
    startVerify,
    isSubmitting,
    verify,
    data
  };
};
