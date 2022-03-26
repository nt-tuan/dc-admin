import { MethodEnum } from "@/components/user-profile/constants/tfa.enum";
import { usePhoneVerifier } from "../components/phone-verifier/use-phone-verifier";
import { useVerifier } from "./use-verifier";
import { useTFAState } from "./use-tfa-state";
import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import { PhoneVerifier } from "../components/phone-verifier";
import { GAVerifier } from "../components/ga-verifier";
import { EmailVerifier } from "../components/email-verifier";
// import type { Verifier } from "../models/verifier";
import { useGAVerifier } from "./use-ga-verifier";
import { parseTfaSettingFromServer } from "../mappers";
import React from "react";

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

export interface ValidatorConfig {
  sms: {
    enabled: boolean;
    phone?: string;
    useProfile: boolean;
  };
  ga: {
    enabled: boolean;
    isSetup: boolean;
  };
  email: {
    enabled: boolean;
    email?: string;
  };
}

export const defaultTFAConfig: ValidatorConfig = {
  sms: {
    enabled: true,
    useProfile: true
  },
  ga: {
    enabled: true,
    isSetup: false
  },
  email: {
    enabled: true
  }
};

export const useTFAVaildator = (
  {
    validateFn,
    requestVerifyFn,
    ...callbacks
  }: {
    onSuccess?: () => void;
    onReady?: () => void;
    onError?: () => void;
    requestVerifyFn?: () => Promise<void>;
    validateFn: (code: string) => Promise<void>;
  },
  defaultConfig: ValidatorConfig
) => {
  const {
    isVerifying,
    start,
    method,
    onReady,
    onSuccess,
    onError,
    verifiedData,
    verifyStatus,
    cancel
  } = useTFAState(callbacks);
  const [config, setConfig] = React.useState<ValidatorConfig>(defaultConfig);
  const phoneVerifier = usePhoneVerifier({
    onReady,
    onSuccess,
    onError,
    requestVerifyFn,
    validateFn: validateFn,
    phone: config?.sms?.phone,
    useProfile: config?.sms?.useProfile
  });
  const gaVerifier = useGAVerifier({
    onReady,
    onSuccess,
    onError,
    requestVerifyFn,
    validateFn,
    isSetup: config?.ga?.isSetup
  });
  const emailVerifier = useVerifier({
    onReady,
    onSuccess,
    onError,
    requestVerifyFn,
    validateFn
  });
  const verifiers = {
    [MethodEnum.SMS]: phoneVerifier,
    [MethodEnum.GA]: gaVerifier,
    [MethodEnum.EMAIL]: emailVerifier
  };
  const availableMethods = Object.keys(verifiers);
  const startVerify = (tfaType: string) => {
    const { method } = parseTfaSettingFromServer(tfaType);
    if (!method || !verifiers[method]) {
      return;
    }
    const currentVerifier = verifiers[method];
    currentVerifier.startVerify();
    start(method);
  };
  const verify = (code: string) => {
    if (!method || !verifiers[method]) {
      return;
    }
    const currentVerifier = verifiers[method];
    currentVerifier.verify(code);
  };

  const isLoading = method && verifiers[method] && verifiers[method].isLoading;

  return {
    isVerifying,
    setConfig,
    verifiers,
    method,
    verifierComponents,
    availableMethods,
    verifiedData,
    verifyStatus,
    cancel,
    startVerify,
    verify,
    isLoading
  };
};
