import { MethodEnum } from "@/components/user-profile/constants/tfa.enum";
import { usePhoneVerifier } from "../components/phone-verifier/use-phone-verifier";
import { sendTfaCode, updateTfaSettings } from "../services/auth.service";
import { useVerifier } from "./use-verifier";
import { useTwoFactorValidator, VerifyStatusEnum } from "./use-tfa-verifier";
import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import { PhoneVerifier } from "../components/phone-verifier";
import { GAVerifier } from "../components/ga-verifier";
import { EmailVerifier } from "../components/email-verifier";
import { useSelector } from "react-redux";
import { selectBrowserFingerprint } from "@/redux/settings/settings.duck";
import type { Verifier } from "../models/verifier";
import { useGAVerifier } from "./use-ga-verifier";

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

const GoogleActivator = (props) => <Activator {...props} buttonText="Setup Google Authenticator" />;

const verifierComponents = {
  [MethodEnum.SMS]: {
    Activator: PhoneActivator,
    Modal: PhoneVerifier
  },
  [MethodEnum.GA]: {
    Modal: GAVerifier,
    Activator: GoogleActivator
  },
  [MethodEnum.EMAIL]: {
    Activator: EmailActivator,
    Modal: EmailVerifier
  }
};

export const useTFAVaildator = (
  { tfaType, onSuccess, method },
  config: {
    ga: {
      isSetup: boolean;
    };
  }
) => {
  const browserId = useSelector(selectBrowserFingerprint);
  const {
    onReady,
    onSuccess: onValidateSuccess,
    onError,
    verifiedData,
    verifyStatus,
    cancel
  } = useTwoFactorValidator();
  const requestVerifyFn = () =>
    sendTfaCode({
      tfaType,
      browserId
    });
  const handleSuccess = () => {
    onValidateSuccess();
    if (onSuccess) {
      onSuccess();
    }
  };
  const phoneVerifier = usePhoneVerifier({
    onReady,
    onSuccess: handleSuccess,
    onError,
    requestVerifyFn,
    validateFn: (code) => updateTfaSettings({ tfaType, browserId, code })
  });
  const gaVerifier = useGAVerifier({
    onReady,
    onSuccess: handleSuccess,
    onError,
    requestVerifyFn,
    validateFn: (code) => updateTfaSettings({ tfaType, browserId, code }),
    isSetup: config?.ga?.isSetup
  });
  const emailVerifier = useVerifier({
    onReady,
    onSuccess: handleSuccess,
    onError,
    requestVerifyFn,
    validateFn: (code) => updateTfaSettings({ tfaType, browserId, code })
  });
  const verifiers: {
    [key: string]: Verifier;
  } = {
    [MethodEnum.SMS]: phoneVerifier,
    [MethodEnum.GA]: gaVerifier,
    [MethodEnum.EMAIL]: emailVerifier
  };
  const availableMethods = Object.keys(verifiers);
  const currentVerifier = verifiers[method];
  const currentVerifierComponent = verifierComponents[method];

  const { Activator: CustomActivator, Modal } = currentVerifierComponent || {};
  const tfaVerifyModal =
    verifyStatus === VerifyStatusEnum.PENDING && currentVerifier ? (
      <Modal open onClose={cancel} verifier={currentVerifier as any} />
    ) : (
      <></>
    );

  return {
    verifiers,
    currentVerifier,
    verifierComponents,
    availableMethods,
    verifiedData,
    verifyStatus,
    cancel,
    tfaVerifyModal,
    CustomActivator
  };
};
