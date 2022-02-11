import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";

export const ConfirmModal = ({ showForm, toggleShowForm, innerText, title, onConfirmLock }) => {
  return (
    <Dialog open={showForm} onClose={toggleShowForm}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{innerText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleShowForm}>Cancel</Button>
        <Button onClick={onConfirmLock} autoFocus variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
