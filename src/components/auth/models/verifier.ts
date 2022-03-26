import React from "react";
export interface BaseVerifierModalProps {
  open: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  isLoading?: boolean;
  isSubmitting?: boolean;
}

export type VerifierComponent<T = {}> = React.FC<BaseVerifierModalProps & T>;
