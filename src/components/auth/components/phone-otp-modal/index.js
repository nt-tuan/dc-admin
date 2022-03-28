import { DTCModal, Loader } from "@/components/commons";
import { OtpInput } from "@/components/commons/otp-input";
import Button from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const Content = ({ phone, onVerify, isSubmitting, onClose, sensor }) => {
  const [code, setCode] = React.useState("");
  const sensoredPhone = sensor ? ` *******${phone?.substring(phone.length - 4)}` : phone;
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
        Please enter your OTP sent to your verified mobile number {sensoredPhone}
      </Typography>
      <OtpInput onFinish={handleFinish} onChange={setCode} numInputs={6} />
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
export const PhoneOTPModal = ({
  open,
  onClose,
  phone,
  onVerify,
  isSubmitting,
  isLoading,
  sensor = true
}) => {
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
          <Content
            sensor={sensor}
            phone={phone}
            onVerify={onVerify}
            isSubmitting={isSubmitting}
            onClose={onClose}
          />
        )
      }
    />
  );
};
