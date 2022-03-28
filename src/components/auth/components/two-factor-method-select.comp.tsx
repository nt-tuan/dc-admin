import { MethodEnum, MethodLabelEnum } from "../models/enums";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import Button from "@mui/lab/LoadingButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Stack from "@mui/material/Stack";

import { TwoFactorValidator } from "@/components/auth/components/two-factor-validator/two-factor-validator.comp";
import { sendTfaCode, updateTfaSettings } from "../services/auth.service";
import { useSelector } from "react-redux";
import { selectBrowserFingerprint } from "@/redux/settings/settings.duck";

const CurrentMethod = ({ data, selectedMethod, onUpdate, tfaType }) => {
  const browserId = useSelector(selectBrowserFingerprint);
  const Activator = ({ loading, onClick }) => {
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>{MethodLabelEnum[selectedMethod]}</Typography>
        <CheckCircleIcon color="success" />
        <Button loading={Boolean(loading)} variant="contained" onClick={onClick}>
          Update Method
        </Button>
      </Stack>
    );
  };
  const validateFn = (code: string) =>
    updateTfaSettings({
      tfaType,
      browserId,
      code
    });
  const requestVerifyFn = () =>
    sendTfaCode({
      tfaType,
      browserId
    });
  return (
    <TwoFactorValidator
      tfaType={tfaType}
      Activator={Activator}
      onSuccess={onUpdate}
      validateFn={validateFn}
      requestVerifyFn={requestVerifyFn}
      config={{
        ga: {
          isSetup: false
        },
        sms: {
          enablePhoneConfirm: false
        },
        email: {}
      }}
    />
  );
};
const MethodSelect = ({ selectedMethod, onChange }) => {
  return (
    <RadioGroup row value={selectedMethod} onChange={onChange}>
      {Object.keys(MethodEnum).map((value) => (
        <FormControlLabel
          key={value}
          value={value}
          control={<Radio />}
          label={<Typography variant="body2">{MethodLabelEnum[value]}</Typography>}
        />
      ))}
    </RadioGroup>
  );
};

export const TwoFactorMethodSelect = ({
  data,
  selectedMethod,
  onChange,
  tfaType,
  isOpenUpdatingTfa,
  onUpdate
}) => {
  const handleMethodChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <>
      <Typography mb={2} variant="h6">
        Method
      </Typography>
      {isOpenUpdatingTfa ? (
        <MethodSelect selectedMethod={selectedMethod} onChange={handleMethodChange} />
      ) : (
        <CurrentMethod
          selectedMethod={selectedMethod}
          onUpdate={onUpdate}
          tfaType={tfaType}
          data={data}
        />
      )}
    </>
  );
};
