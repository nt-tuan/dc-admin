import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { UserService } from "@/services";

export const DeleteUserModal = ({ user, isOpen, onCancel, onSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const handleDeleteUser = () => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.deleteAdminUser(user.id);
      onSuccess && onSuccess();
    }).finally(() => setLoading(false));
  };
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          variant="contained"
          size="large"
          onClick={handleDeleteUser}
        >
          Yes
        </LoadingButton>
        <LoadingButton
          loading={loading}
          variant="outlined"
          style={{ color: "red", borderColor: "red" }}
          size="large"
          onClick={onCancel}
        >
          No
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
