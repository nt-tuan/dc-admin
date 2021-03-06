import { DTCModal } from "@/components/commons";
import WarningAmber from "@mui/icons-material/WarningAmber";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";

interface Props {
  onCancel: () => void;
  onSave: () => void;
  onClose: () => void;
  isUpdating: boolean;
}
const LeaveConfirm = ({ onCancel, onSave, onClose, isUpdating }: Props) => {
  return (
    <DTCModal
      size="small"
      onClose={onClose}
      open
      title={<WarningAmber color="warning" />}
      content={
        <Stack alignItems="center" spacing={2}>
          <Typography variant="body2">There are unsaved changes</Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={onCancel} variant="outlined">
              Cancel
            </Button>
            <LoadingButton loading={isUpdating} onClick={onSave} variant="contained">
              Save
            </LoadingButton>
          </Stack>
        </Stack>
      }
    />
  );
};

export default LeaveConfirm;
