import { GASetupModal } from "./ga-setup-modal.comp";
import { GAOTPModal } from "./ga-otp-modal.comp";
import React from "react";
import { VerifierComponent } from "../../models/verifier";

export const GAVerifier: VerifierComponent<{
  qrCodeUrl?: string;
  secretKey?: string;
}> = ({ onClose, onVerify, isSubmitting, isLoading, qrCodeUrl, secretKey }) => {
  const [step, setStep] = React.useState(qrCodeUrl && secretKey ? 0 : 1);
  return (
    <>
      {qrCodeUrl && secretKey && (
        <GASetupModal
          open={step === 0}
          qrCodeUrl={qrCodeUrl}
          secretKey={secretKey}
          onNext={() => setStep(1)}
          onClose={onClose}
        />
      )}
      <GAOTPModal
        isLoading={Boolean(isLoading)}
        open={step === 1}
        onClose={onClose}
        onVerify={onVerify}
        isSubmitting={Boolean(isSubmitting)}
      />
    </>
  );
};
