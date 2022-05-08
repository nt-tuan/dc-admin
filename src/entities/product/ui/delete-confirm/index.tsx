import { DTCModal } from "@/components/commons";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";

interface Props {
  open?: boolean;
  isLoading?: boolean;
  onCancel: () => void;
  onDelete: () => void;
}
const DeleteConfirm = ({ open, onCancel, onDelete, isLoading }: Props) => {
  return (
    <DTCModal
      size="tiny"
      onClose={onCancel}
      open={open}
      title="Confirm Delete"
      content={
        <Stack alignItems="center" spacing={2}>
          <Typography variant="body2" textAlign="center">
            Are you sure you want to delete the selected item(s)?
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button size="large" onClick={onCancel} variant="outlined">
              Cancel
            </Button>
            <LoadingButton
              size="large"
              loading={isLoading}
              color="error"
              onClick={onDelete}
              variant="contained"
            >
              Delete
            </LoadingButton>
          </Stack>
        </Stack>
      }
    />
  );
};

export default DeleteConfirm;
