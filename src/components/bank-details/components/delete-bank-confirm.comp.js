import { DTCModal } from "@/components/commons";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/lab/LoadingButton";
import { useDeleteBank } from "../services/use-query-banks";
import { useHistory } from "react-router-dom";
import { BankPathEnum } from "../bank-path.enum";

export const DeleteBankConfirm = ({ open, onClose, id }) => {
  const history = useHistory();
  const { mutate, isLoading } = useDeleteBank({
    onSuccess: () => {
      history.push(BankPathEnum.BANK_HOME);
    }
  });
  const handleDelete = () => {
    mutate(id);
  };
  return (
    <DTCModal
      size="tiny"
      open={open}
      onClose={onClose}
      title={
        <Typography variant="inherit" textAlign="center">
          Confirm Delete
        </Typography>
      }
      content={
        <Stack alignItems="center" spacing={2}>
          <Typography textAlign="center" variant="body2">
            Are you sure want to delete your bank account?
          </Typography>
          <Stack spacing={2} direction="row" justifyContent="space-around" alignItems="center">
            <Button loading={isLoading} onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button loading={isLoading} onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </Stack>
        </Stack>
      }
    />
  );
};
