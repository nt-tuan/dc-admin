import { DTCModal, Loader } from "@/components/commons";

import Button from "@mui/lab/LoadingButton";
import { OtpInput } from "@/components/commons/otp-input";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ContentProps {
  onVerify: (code: string) => void;
  isSubmitting: boolean;
  onClose: () => void;
}
const Content = ({ onVerify, isSubmitting, onClose }: ContentProps) => {
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
        Enter the 6-digit code that you see in the app
      </Typography>
      <OtpInput onFinish={handleFinish} onChange={setCode} numberDigits={6} />
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
        <Button onClick={onClose}>Cancel</Button>
      </Stack>
    </Stack>
  );
};

interface Props extends ContentProps {
  open?: boolean;
  isLoading: boolean;
  onClose: () => void;
}
export const GAOTPModal = ({ open, onClose, onVerify, isSubmitting, isLoading }: Props) => {
  return (
    <DTCModal
      open={open}
      onClose={onClose}
      size="tiny"
      title={
        <Typography fontSize="16px" lineHeight="24px" variant="inherit" textAlign="center">
          Google Authentication
        </Typography>
      }
      content={
        isLoading ? (
          <Loader />
        ) : (
          <Content onVerify={onVerify} onClose={onClose} isSubmitting={isSubmitting} />
        )
      }
    />
  );
};
