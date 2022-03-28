import { PhoneOTPModal } from "../phone-otp-modal";
import { VerifyPhoneRequestModal } from "./verify-phone-request-modal.comp";
import { PhoneFormModal } from "@/components/user-profile/components/add-phone-modal/add-phone-modal.comp";
import { PhoneVerifierConfig, VerifierComponent } from "../../models/verifier";
import { usePhoneConfirm } from "./use-phone-confirm";

export const PhoneVerifier: VerifierComponent<PhoneVerifierConfig> = ({
  open,
  onClose,
  onVerify,
  isSubmitting,
  isLoading,
  config
}) => {
  const { phone, isConfirmed, confirmPhone, isLoading: phoneConfirmLoading } = usePhoneConfirm({
    enabled: Boolean(config?.enablePhoneConfirm)
  });

  if (!open || isLoading) return <></>;
  if (!phone && config?.enablePhoneConfirm)
    return <PhoneFormModal open={open && !phone} onClose={onClose} />;
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
        sensor={config?.phone == null}
        phone={config?.phone ?? phone}
        onVerify={onVerify}
        isSubmitting={isSubmitting}
        isLoading={isLoading}
      />
    </>
  );
};
