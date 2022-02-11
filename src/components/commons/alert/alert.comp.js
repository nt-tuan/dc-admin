import React from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

export const AlertComponent = ({ open, content, state, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert severity={state}>
        <AlertTitle>{content}</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
