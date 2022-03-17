import Typography from "@mui/material/Typography";
import Button from "@mui/lab/LoadingButton";
import { DTCModal } from "@/components/commons";
import Stack from "@mui/material/Stack";

const Content = ({ onConfirm, isSubmitting }) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography>Please verify your phone number</Typography>

      <Button onClick={onConfirm} loading={isSubmitting} variant="contained">
        Verify Phone Number
      </Button>
    </Stack>
  );
};
export const VerifyPhoneRequestModal = ({ open, onClose, onConfirm, isSubmitting, isLoading }) => {
  return (
    <DTCModal
      open={open}
      onClose={onClose}
      size="tiny"
      isLoading={isLoading}
      title={
        <Typography variant="inherit" textAlign="center">
          Verify Phone
        </Typography>
      }
      content={<Content onConfirm={onConfirm} isSubmitting={isSubmitting} />}
    />
  );
};
