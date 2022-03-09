import { GoogleAuthenticationInstructionModal } from "./google-authenticator-instruction-modal.comp";
import { GoogleAuthenticatorOTPModal } from "./google-authenticator-otp-modal.comp";
import React from "react";

export const GoogleAuthenticatorModal = ({
  onClose,
  qrCodeUrl,
  secretKey,
  onVerify,
  isSubmitting
}) => {
  const [step, setStep] = React.useState(0);
  return (
    <>
      <GoogleAuthenticationInstructionModal
        open={step === 0}
        qrCodeUrl={qrCodeUrl}
        secretKey={secretKey}
        onNext={() => setStep(1)}
        onClose={onClose}
      />
      <GoogleAuthenticatorOTPModal
        open={step === 1}
        onClose={onClose}
        onVerify={onVerify}
        isSubmitting={isSubmitting}
      />
    </>
  );
};
