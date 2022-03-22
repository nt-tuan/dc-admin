import React from "react";
import { PhoneOTPModal } from "../phone-otp-modal";
import { VerifyPhoneRequestModal } from "./verify-phone-request-modal.comp";
import { PhoneFormModal } from "@/components/user-profile/components/add-phone-modal/add-phone-modal.comp";
import { VerifierComponent } from "../../models/verifier";
import { usePhoneConfirm } from "./use-phone-confirm";

export const PhoneVerifier: VerifierComponent = ({ open, onClose, verifier }) => {
  const { phone, isConfirmed, confirmPhone, isLoading } = usePhoneConfirm();

  if (!open || isLoading) return <></>;
  if (!phone) return <PhoneFormModal open={open && !phone} onClose={onClose} />;
  return (
    <>
      <VerifyPhoneRequestModal
        open={!isConfirmed}
        onConfirm={confirmPhone}
        onClose={onClose}
        isLoading={false}
        isSubmitting={false}
      />
      <PhoneOTPModal
        open={isConfirmed}
        onClose={onClose}
        phone={phone}
        onVerify={verifier.verify}
        isSubmitting={verifier.isSubmitting}
        isLoading={verifier.isLoading}
      />
    </>
  );
};
