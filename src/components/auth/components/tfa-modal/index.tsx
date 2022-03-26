import { MethodEnum } from "../../models/enums";
import { EmailVerifier } from "../email-verifier";
import { GAVerifier } from "../ga-verifier";
import { PhoneVerifier } from "../phone-verifier";

interface Props {
  method?: string;
  open?: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  phone?: string;
  enablePhoneConfirm: boolean;
  qrCodeUrl?: string;
  secretKey?: string;
}
export const TFAModal = ({
  method,
  open,
  onClose,
  onVerify,
  enablePhoneConfirm,
  phone,
  qrCodeUrl,
  secretKey
}: Props) => {
  if (!open) {
    return <></>;
  }
  if (method === MethodEnum.EMAIL) {
    return <EmailVerifier open onClose={onClose} onVerify={onVerify} />;
  }
  if (method === MethodEnum.SMS) {
    return (
      <PhoneVerifier
        open
        onClose={onClose}
        onVerify={onVerify}
        enablePhoneConfirm={enablePhoneConfirm}
        phone={phone}
      />
    );
  }
  if (method === MethodEnum.GA) {
    return (
      <GAVerifier
        open
        onClose={onClose}
        onVerify={onVerify}
        qrCodeUrl={qrCodeUrl}
        secretKey={secretKey}
      />
    );
  }
  return <></>;
};
