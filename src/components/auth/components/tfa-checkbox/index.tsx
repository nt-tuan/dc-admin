import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

import { defaultTFAConfig, useTFAVaildator } from "@/components/auth/controllers/use-tfa-validator";
// import { VerifyStatusEnum } from "@/components/auth/controllers/use-tfa-state";

interface Props {
  tfaType: string;
  isTFAEnabled: boolean;
  onChange: (checked: boolean) => void;
  validateFn: (code: string) => Promise<void>;
  requestVerifyFn: () => Promise<void>;
}
export const TFACheckbox = ({
  tfaType,
  isTFAEnabled,
  onChange,
  validateFn,
  requestVerifyFn
}: Props) => {
  const validator = useTFAVaildator(
    {
      validateFn,
      requestVerifyFn,
      onSuccess: () => onChange(false)
    },
    defaultTFAConfig
  );
  const changeTFA = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (!checked) {
      validator.startVerify(tfaType);
      return;
    }
    onChange(checked);
  };
  // if (validator.verifyStatus === VerifyStatusEnum.PENDING) return validator.tfaVerifyModal;
  return (
    <FormControlLabel
      control={<Checkbox checked={isTFAEnabled} onChange={changeTFA} />}
      label={<Typography variant="body2">Enable two step authentication</Typography>}
    />
  );
};
