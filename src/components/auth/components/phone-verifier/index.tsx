import React from "react";
import { PhoneOTPModal } from "../phone-otp-modal";
import { VerifyPhoneRequestModal } from "./verify-phone-request-modal.comp";
import { PhoneFormModal } from "@/components/user-profile/components/add-phone-modal/add-phone-modal.comp";
import { VerifierComponent } from "../../models/verifier";
import { usePhoneConfirm } from "./use-phone-confirm";

export const PhoneVerifier: VerifierComponent<{
  enablePhoneConfirm: boolean;
  phone?: string;
}> = ({ open, onClose, onVerify, isSubmitting, isLoading, enablePhoneConfirm, phone }) => {
  const {
    phone: currentUserPhone,
    isConfirmed,
    confirmPhone,
    isLoading: phoneConfirmLoading
  } = usePhoneConfirm({
    enabled: enablePhoneConfirm
  });

  if (!open || isLoading) return <></>;
  if (!phone) return <PhoneFormModal open={open && !phone} onClose={onClose} />;
  return (
    <>
      <VerifyPhoneRequestModal
        open={!isConfirmed}
        onConfirm={confirmPhone}
        onClose={onClose}
        isLoading={phoneConfirmLoading}
        isSubmitting={false}
      />
      <PhoneOTPModal
        open={isConfirmed}
        onClose={onClose}
        phone={phone ?? currentUserPhone}
        onVerify={onVerify}
        isSubmitting={isSubmitting}
        isLoading={isLoading}
      />
    </>
  );
};
