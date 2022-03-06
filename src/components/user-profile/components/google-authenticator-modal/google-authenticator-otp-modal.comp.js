import { DTCModal, Loader } from "@/components/commons";

import Button from "@mui/lab/LoadingButton";
import { OtpInput } from "@/components/commons/otp-input";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Content = ({ onVerify, isSubmitting }) => {
  const [code, setCode] = React.useState("");
  const canSubmit = code.length === 6;
  const ref = React.useRef();
  const handleFinish = () => {
    ref.current.focus();
  };
  const verify = () => {
    onVerify({ code });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && canSubmit) {
      verify();
    }
  };
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="body2" textAlign="center">
        Enter the 6-digit code that you see in the app
      </Typography>
      <OtpInput onFinish={handleFinish} onChange={setCode} numInputs={6} />
      <Stack direction="row" justifyContent="space-around" spacing={2}>
        <Button
          ref={ref}
          onKeyDown={handleKeyDown}
          disabled={!canSubmit}
          variant="contained"
          onClick={verify}
          loading={isSubmitting}
        >
          Submit
        </Button>
        <Button>Cancel</Button>
      </Stack>
    </Stack>
  );
};
export const GoogleAuthenticatorOTPModal = ({
  open,
  onClose,
  onVerify,
  isSubmitting,
  isLoading
}) => {
  return (
    <DTCModal
      open={open}
      onClose={onClose}
      size="tiny"
      title={
        <Typography variant="inherit" textAlign="center">
          Setup Google Authentication
        </Typography>
      }
      content={isLoading ? <Loader /> : <Content onVerify={onVerify} isSubmitting={isSubmitting} />}
    />
  );
};
