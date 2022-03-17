import React from "react";
import { PhoneOTPModal } from "../phone-otp-modal";
import { VerifyPhoneRequestModal } from "./verify-phone-request-modal.comp";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import { PhoneFormModal } from "@/components/user-profile/components/add-phone-modal/add-phone-modal.comp";

export const PhoneVerifier = ({ open, onClose, verifier }) => {
  const { data, isLoading } = useUserProfile();
  const { phone } = data || {};
  const handleClose = () => {
    onClose();
    verifier.reset();
  };

  if (!open || isLoading) return <></>;
  if (!phone) return <PhoneFormModal open={open && !phone} onClose={onClose} />;
  return (
    <>
      <VerifyPhoneRequestModal
        open={verifier.isConfirmingPhone}
        onConfirm={verifier.startConfirmPhone}
        onClose={handleClose}
        isLoading={verifier.isLoading}
        isSubmitting={verifier.isLoading}
      />
      <PhoneOTPModal
        open={verifier.isVerifying}
        onClose={handleClose}
        phone={verifier.phone}
        onVerify={verifier.validateOTP}
        isSubmitting={verifier.isSubmitting}
        isLoading={verifier.isLoading}
      />
    </>
  );
};
