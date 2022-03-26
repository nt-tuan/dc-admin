import { useTFAVaildator, ValidatorConfig } from "../../controllers/use-tfa-validator";
import { TFAModal } from "../tfa-modal";

interface Props {
  tfaType: string;
  Activator: React.FC<{ loading: boolean; onClick: () => void }>;
  onSuccess: () => void;
  config: ValidatorConfig;
  validateFn: (code: string) => Promise<void>;
  requestVerifyFn: () => Promise<void>;
  enablePhoneConfirm: boolean;
  phone?: string;
  qrCodeUrl?: string;
  secretKey?: string;
}
export const TwoFactorValidator = ({
  tfaType,
  Activator,
  onSuccess,
  config,
  validateFn,
  requestVerifyFn,
  enablePhoneConfirm,
  phone
}: Props) => {
  const {
    method,
    cancel,
    startVerify,
    isLoading,
    isVerifying,
    verify,
    verifiedData
  } = useTFAVaildator(
    {
      validateFn,
      requestVerifyFn,
      onSuccess
    },
    config
  );

  const handleClick = () => {
    startVerify(tfaType);
  };

  return (
    <>
      <Activator loading={Boolean(isLoading)} onClick={handleClick} />
      <TFAModal
        method={method}
        open={isVerifying}
        onClose={cancel}
        onVerify={verify}
        enablePhoneConfirm={enablePhoneConfirm}
        phone={phone}
        qrCodeUrl={verifiedData?.qrCodeUrl}
        secretKey={verifiedData?.secretKey}
      />
    </>
  );
};
