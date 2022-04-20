import { DTCModal } from "@/components/commons";
import WarningAmber from "@mui/icons-material/WarningAmber";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  onCancel: () => void;
  onSave: () => void;
}
const LeaveConfirm = ({ onCancel, onSave }: Props) => {
  return (
    <DTCModal
      size="small"
      onClose={() => {}}
      open
      title={<WarningAmber color="warning" />}
      content={
        <Stack alignItems="center" spacing={2}>
          <Typography variant="body2">
            Are you sure you want to delete the selected item(s)?
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={onCancel} variant="outlined">
              Cancel
            </Button>
            <Button onClick={onSave} variant="contained">
              Save
            </Button>
          </Stack>
        </Stack>
      }
    />
  );
};

export default LeaveConfirm;
