import { useTFAVaildator } from "../../controllers/use-tfa-validator";
import { TFAConfig } from "../../models/verifier";
import { TFAModal } from "../tfa-modal";

interface Props {
  tfaType: string;
  Activator: React.FC<{ loading: boolean; onClick: () => void }>;
  onSuccess: () => void;
  config: TFAConfig;
  validateFn: (code: string) => Promise<void>;
  requestVerifyFn: () => Promise<void>;
}
export const TwoFactorValidator = ({
  tfaType,
  Activator,
  onSuccess,
  config,
  validateFn,
  requestVerifyFn
}: Props) => {
  const {
    method,
    cancel,
    startVerify,
    isLoading,
    isVerifying,
    verify,
    isSubmitting
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
        config={config}
        isSubmitting={isSubmitting}
      />
    </>
  );
};
