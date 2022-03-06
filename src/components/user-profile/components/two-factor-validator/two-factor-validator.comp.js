import Button from "@mui/lab/LoadingButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MethodLabelEnum } from "../../constants/tfa.enum";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const TwoFactorValidator = ({
  selectedMethod,
  twoFactorValidatorProvider,
  onUpdate,
  isUpdating
}) => {
  const {
    verifiedTfaType,
    verifiedData,
    isLoading,
    sendCode,
    verifyStatus,
    verify,
    cancel,
    currentProvider
  } = twoFactorValidatorProvider;

  if (!verifiedTfaType) {
    return (
      <Button disabled={isLoading} loading={isLoading} variant="contained" onClick={sendCode}>
        {currentProvider.setupButtonLabel}
      </Button>
    );
  }

  if (verifyStatus)
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>{MethodLabelEnum[selectedMethod]}</Typography>
        <CheckCircleIcon color="success" />
        <Button variant="contained" onClick={onUpdate} loading={isUpdating}>
          Update Method
        </Button>
      </Stack>
    );

  if (currentProvider) {
    const Component = currentProvider.component;
    return <Component {...verifiedData} onVerify={verify} onClose={cancel} />;
  }
  return <></>;
};
