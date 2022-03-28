import { MethodEnum } from "../../models/enums";
import { TFAConfig } from "../../models/verifier";
import { EmailVerifier } from "../email-verifier";
import { GAVerifier } from "../ga-verifier";
import { PhoneVerifier } from "../phone-verifier";

interface Props {
  method?: string;
  open?: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  isSubmitting?: boolean;
  config: TFAConfig;
}
export const TFAModal = ({ method, open, onClose, onVerify, config, isSubmitting }: Props) => {
  if (!open) {
    return <></>;
  }
  if (method === MethodEnum.EMAIL) {
    return (
      <EmailVerifier
        open
        onClose={onClose}
        onVerify={onVerify}
        isSubmitting={isSubmitting}
        config={config.email}
      />
    );
  }
  if (method === MethodEnum.SMS) {
    return <PhoneVerifier open onClose={onClose} onVerify={onVerify} config={config.sms} />;
  }
  if (method === MethodEnum.GA) {
    return <GAVerifier open onClose={onClose} onVerify={onVerify} config={config.ga} />;
  }
  return <></>;
};
