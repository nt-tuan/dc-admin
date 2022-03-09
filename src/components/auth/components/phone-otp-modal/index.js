import { DTCModal, Loader } from "@/components/commons";

import Button from "@mui/lab/LoadingButton";
import { OtpInput } from "@/components/commons/otp-input";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Content = ({ phone, onVerify, isSubmitting }) => {
  const [code, setCode] = React.useState("");
  const lastDigits = phone?.substring(phone.length - 4);
  const canSubmit = code.length === 6;
  const ref = React.useRef();
  const handleFinish = () => {
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
        Please enter your OTP sent to your verified mobile number *******{`{${lastDigits}}`}
      </Typography>
      <OtpInput onFinish={handleFinish} onChange={setCode} numInputs={6} />
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
    </Stack>
  );
};
export const PhoneOTPModal = ({ open, onClose, phone, onVerify, isSubmitting, isLoading }) => {
  return (
    <DTCModal
      open={open}
      onClose={onClose}
      size="tiny"
      title={
        <Typography variant="inherit" textAlign="center">
          Enter OTP
        </Typography>
      }
      content={
        isLoading ? (
          <Loader />
        ) : (
          <Content phone={phone} onVerify={onVerify} isSubmitting={isSubmitting} />
        )
      }
    />
  );
};
