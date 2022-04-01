import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { EditUserForm } from "@/components/user-management/edit-user-form.comp";

export const EditUserModal = ({ isOpen, onCancel, onConfirm, user }) => {
  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <EditUserForm user={user} onCancel={onCancel} onSuccess={onConfirm} />
      </DialogContent>
    </Dialog>
  );
};
