import { parseTfaSettingFromServer } from "@/components/auth/mappers";
import { useTFAVaildator } from "../../controllers/use-tfa-validator";
import { VerifyStatusEnum } from "../../controllers/use-tfa-verifier";

export const TwoFactorValidator = ({ tfaType, Activator = undefined, onSuccess, config }) => {
  const { method } = parseTfaSettingFromServer(tfaType);
  const { verifyStatus, CustomActivator, currentVerifier, tfaVerifyModal } = useTFAVaildator(
    {
      tfaType,
      onSuccess,
      method
    },
    config
  );
  const DisplayedActivator = Activator || CustomActivator;
  if (currentVerifier == null) return <></>;
  if (verifyStatus === VerifyStatusEnum.PENDING) {
    return tfaVerifyModal;
  }
  return (
    <DisplayedActivator loading={currentVerifier.isLoading} onClick={currentVerifier.startVerify} />
  );
};
