import { OtpInput } from "@/components/commons/otp-input";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import Button from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { VerifierComponent } from "@/components/auth/models/verifier";
import React from "react";
import { DTCModal } from "@/components/commons";

const Content = ({ email, onVerify, isSubmitting, onClose }) => {
  const [code, setCode] = React.useState("");
  const canSubmit = code.length === 6;
  const ref = React.useRef<HTMLButtonElement>(null);
  const handleFinish = () => {
    if (ref.current == null) return;
    ref.current.focus();
  };
  const verify = () => {
    onVerify(code);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && canSubmit) {
      verify();
    }
  };
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="body2" textAlign="center">
        Please enter your OTP sent to your verified email address {email}
      </Typography>
      <OtpInput onFinish={handleFinish} onChange={setCode} numberDigits={6} />
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          ref={ref}
          onKeyDown={handleKeyDown}
          disabled={!canSubmit}
          variant="contained"
          onClick={verify}
          loading={isSubmitting}
          tabIndex={0}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};
export const EmailVerifier: VerifierComponent = ({ open, onClose, onVerify, isSubmitting }) => {
  const { data, isLoading } = useUserProfile();
  const { email } = data || {};
  return (
    <DTCModal
      open={open}
      isLoading={isLoading}
      onClose={onClose}
      size="tiny"
      title={
        <Typography variant="inherit" textAlign="center">
          Enter OTP
        </Typography>
      }
      content={
        <Content email={email} onVerify={onVerify} isSubmitting={isSubmitting} onClose={onClose} />
      }
    />
  );
};
