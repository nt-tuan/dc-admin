import React, { useState } from "react";

import { PasscodeRequiredModal } from "./passcode-required-modal.comp";
import { PasscodeVerifierModal } from "./passcode-verifier-modal.comp";
import { PhoneUnverifiedModal } from "./phone-unverified-modal.comp";
import { PhoneVerifierModal } from "./phone-verifier.comp";
import { selectUsers } from "redux/user/user.duck";
import { useSelector } from "react-redux";

const STATUS = {
  PASSCODE_NOT_EXISTED: "PASSCODE_NOT_EXISTED",
  PHONE_NOT_VERIFIED: "PHONE_NOT_VERIFIED",
  VERIFYING_PHONE: "VERIFYING_PHONE",
  VERIFYING_PASSCODE: "VERIFYING_PASSCODE",
  HIDDEN: "HIDDEN"
};

export const ThreeStepVerify = ({ open, onCancel, onVerified, resetOnOpen = true }) => {
  const users = useSelector(selectUsers);
  const [isOTPVerified, setOTPVerified] = useState(false);
  const [isPasscodeVerified, setPasscodeVerified] = useState(false);
  React.useEffect(() => {
    if (open && resetOnOpen) {
      setOTPVerified(false);
      setPasscodeVerified(false);
    }
  }, [open, resetOnOpen]);
  const status = React.useMemo(() => {
    if (!open || isPasscodeVerified) return STATUS.HIDDEN;
    if (!users.phoneVerified) {
      return STATUS.PHONE_NOT_VERIFIED;
    }
    if (!users.existedPasscode) {
      return STATUS.PASSCODE_NOT_EXISTED;
    }
    if (!isOTPVerified) {
      return STATUS.VERIFYING_PHONE;
    }
    return STATUS.VERIFYING_PASSCODE;
  }, [open, users, isOTPVerified, isPasscodeVerified]);
  const handlePasscodeVerified = () => {
    setPasscodeVerified(true);
    if (onVerified) onVerified();
  };

  return (
    <div>
      <PhoneUnverifiedModal visible={status === STATUS.PHONE_NOT_VERIFIED} onCancel={onCancel} />
      <PasscodeRequiredModal visible={status === STATUS.PASSCODE_NOT_EXISTED} onCancel={onCancel} />
      <PhoneVerifierModal
        visible={status === STATUS.VERIFYING_PHONE}
        onCancel={onCancel}
        onVerified={() => setOTPVerified(true)}
      />
      <PasscodeVerifierModal
        visible={status === STATUS.VERIFYING_PASSCODE}
        onCancel={onCancel}
        onVerified={handlePasscodeVerified}
      />
    </div>
  );
};
