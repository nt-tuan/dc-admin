import { GASetupModal } from "./ga-setup-modal.comp";
import { GAOTPModal } from "./ga-otp-modal.comp";
import React from "react";
import { GAVerifierConfig, VerifierComponent } from "../../models/verifier";

export const GAVerifier: VerifierComponent<GAVerifierConfig> = ({
  onClose,
  onVerify,
  isSubmitting,
  isLoading,
  config
}) => {
  const { isSetup } = config || {};
  const [step, setStep] = React.useState(isSetup ? 0 : 1);
  return (
    <>
      {isSetup && <GASetupModal open={step === 0} onNext={() => setStep(1)} onClose={onClose} />}
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
