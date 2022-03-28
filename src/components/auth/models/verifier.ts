import React from "react";
export interface BaseVerifierModalProps<T> {
  open: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  isLoading?: boolean;
  isSubmitting?: boolean;
  config?: T;
}

export type VerifierComponent<T = undefined> = React.FC<BaseVerifierModalProps<T>>;
export interface PhoneVerifierConfig {
  enablePhoneConfirm?: boolean;
  phone?: string;
}
export interface GAVerifierConfig {
  isSetup?: boolean;
}

export interface EmailVerifierConfig {
  loadEmailFromProfile?: boolean;
  email?: string;
}
export interface TFAConfig {
  sms?: PhoneVerifierConfig;
  ga?: GAVerifierConfig;
  email: EmailVerifierConfig;
}

export interface VerifierHookParameter<T> {
  requestVerifyFn?: () => Promise<unknown>;
  validateFn: (code: string) => Promise<unknown>;
  onReady?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  config?: T;
}
export type VerifierHook<T> = (
  p: VerifierHookParameter<T>
) => {
  isLoading: boolean;
  isSubmitting: boolean;
  isVerifying: boolean;
  startVerify: () => void;
  verify: (code: string) => void;
  reset: () => void;
};
