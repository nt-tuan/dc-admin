import React from "react";

export interface Verifier<T = undefined> {
  startVerify: (context?: any) => void;
  verify: (code: string) => void;
  isSubmitting: boolean;
  isLoading: boolean;
  data?: T;
}
interface BaseProps<T> {
  open: boolean;
  onClose: () => void;
  verifier: Verifier<T>;
}

type VerifierProps<T, P> = BaseProps<T> & P;

export type VerifierComponent<T = undefined, P = {}> = React.FC<VerifierProps<T, P>>;
