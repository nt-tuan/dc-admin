import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle as MuiDialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import { UserService } from "@/services";
import CloseIcon from "@mui/icons-material/Close";

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <MuiDialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.text.primary
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
};

export const DeleteUserModal = ({ user, isOpen, onCancel, onSuccess }) => {
  const asyncErrorHandler = useAsyncErrorHandler();
  const [loading, setLoading] = React.useState(false);
  const handleDeleteUser = () => {
    setLoading(true);
    asyncErrorHandler(async () => {
      await UserService.deleteAdminUser(user.id);
      onSuccess && onSuccess();
    }).finally(() => setLoading(false));
  };
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <Box p={2}>
        <DialogTitle onClose={onCancel}>
          <Typography color="text.primary" align="center" variant="subtitle1" fontWeight={700}>
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography color="text.primary">Are you sure want to delete the user?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center" width="100%">
            <Box paddingRight={1}>
              <LoadingButton loading={loading} variant="outlined" size="large" onClick={onCancel}>
                Cancel
              </LoadingButton>
            </Box>
            <Box paddingLeft={1}>
              <LoadingButton
                loading={loading}
                variant="contained"
                color="error"
                size="large"
                onClick={handleDeleteUser}
              >
                Delete
              </LoadingButton>
            </Box>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
