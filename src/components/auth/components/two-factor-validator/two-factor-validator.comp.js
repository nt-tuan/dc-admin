import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MethodLabelEnum } from "../../services/tfa.enum";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { VerifyStatusEnum } from "../../providers/use-two-factor-validator";

export const TwoFactorValidator = ({
  selectedMethod,
  twoFactorValidatorProvider,
  onUpdate,
  isUpdating
}) => {
  const {
    verifiedData,
    sendCode,
    verifyStatus,
    verify,
    cancel,
    currentProvider
  } = twoFactorValidatorProvider;
  if (currentProvider == null) return <></>;
  if (verifyStatus === VerifyStatusEnum.NONE) {
    return (
      <Box>
        {currentProvider.helperText && <Box mb={2}>{currentProvider.helperText}</Box>}
        <Button
          disabled={currentProvider.isPreparing}
          loading={currentProvider.isPreparing}
          variant="contained"
          onClick={sendCode}
        >
          {currentProvider.setupButtonLabel}
        </Button>
      </Box>
    );
  }

  if (verifyStatus === VerifyStatusEnum.VERIFIED)
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>{MethodLabelEnum[selectedMethod]}</Typography>
        <CheckCircleIcon color="success" />
        <Button variant="contained" onClick={onUpdate} loading={isUpdating}>
          Update Method
        </Button>
      </Stack>
    );
  if (verifyStatus === VerifyStatusEnum.PENDING && currentProvider) {
    const Component = currentProvider.component;
    return (
      <Component
        {...verifiedData}
        isSubmitting={currentProvider.isSubmitting}
        onVerify={verify}
        onClose={cancel}
      />
    );
  }
  return <></>;
};
