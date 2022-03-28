import { MethodEnum } from "@/components/user-profile/constants/tfa.enum";
import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import { TwoFactorValidator } from "../two-factor-validator/two-factor-validator.comp";
import { parseTfaSetting } from "../../mappers";
import { sendTfaCode, updateTfaSettings } from "../../services/auth.service";
import { useSelector } from "react-redux";
import { selectBrowserFingerprint } from "@/redux/settings/settings.duck";

const Activator = ({ helperText, loading, disabled, onClick, buttonText }) => (
  <Box>
    {helperText && <Box mb={2}>{helperText}</Box>}
    <Button disabled={disabled} loading={loading} variant="contained" onClick={onClick}>
      {buttonText}
    </Button>
  </Box>
);

const PhoneActivator = (props) => {
  const { data } = useUserProfile();
  return (
    <Activator
      {...props}
      helperText={
        <Typography variant="body2">
          A one-time verification code will be sent to <strong>{data?.phone}</strong>
        </Typography>
      }
      buttonText="Send Code"
    />
  );
};

const EmailActivator = (props) => {
  const { data } = useUserProfile();
  return (
    <Activator
      {...props}
      buttonText="Send Code"
      helperText={
        <Typography>A one-time verification code will be sent to {data?.email}</Typography>
      }
    />
  );
};

const GAActivator = (props) => <Activator {...props} buttonText="Setup Google Authenticator" />;

const activators = {
  [MethodEnum.EMAIL]: EmailActivator,
  [MethodEnum.GA]: GAActivator,
  [MethodEnum.SMS]: PhoneActivator
};

export const TFAUpdateButton = ({ data, selectedMethod, selectedFrequency, onSuccess }) => {
  const tfaType = parseTfaSetting(true, selectedMethod, selectedFrequency);
  const browserId = useSelector(selectBrowserFingerprint);
  const validateFn = (code: string) => updateTfaSettings({ tfaType, browserId, code });
  const requestVerifyFn = () => sendTfaCode({ tfaType, browserId });

  if (activators[selectedMethod] == null) return <></>;
  return (
    <TwoFactorValidator
      Activator={activators[selectedMethod]}
      tfaType={tfaType}
      validateFn={validateFn}
      requestVerifyFn={requestVerifyFn}
      onSuccess={onSuccess}
      config={{
        ga: { isSetup: true },
        sms: { enablePhoneConfirm: true },
        email: { loadEmailFromProfile: true }
      }}
    />
  );
};
