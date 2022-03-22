import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

import { useTFAVaildator } from "@/components/auth/controllers/use-tfa-validator";
import { parseTfaSettingFromServer } from "../../mappers";
import { VerifyStatusEnum } from "@/components/auth/controllers/use-tfa-verifier";

interface Props {
  tfaType: string;
  isTFAEnabled: boolean;
  onChange: (checked: boolean) => void;
}
export const TFACheckbox = ({ tfaType, isTFAEnabled, onChange }: Props) => {
  const { method } = parseTfaSettingFromServer(tfaType);
  const validator = useTFAVaildator(
    {
      tfaType,
      onSuccess: onChange,
      method
    },
    {
      ga: {
        isSetup: false
      }
    }
  );
  const changeTFA = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (!checked && validator.currentVerifier) {
      validator.currentVerifier.startVerify(true);
      return;
    }
    onChange(checked);
  };
  if (validator.verifyStatus === VerifyStatusEnum.PENDING) return validator.tfaVerifyModal;
  return (
    <FormControlLabel
      control={<Checkbox checked={isTFAEnabled} onChange={changeTFA} />}
      label={<Typography variant="body2">Enable two step authentication</Typography>}
    />
  );
};
