import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DTCModal } from "./dtc-modal.comp";
import React from "react";
import Stack from "@mui/material/Stack";
export const DTCConfirmModal = ({ open, onClose, content, title, onConfirm }) => {
  return (
    <DTCModal
      open={open}
      onClose={onClose}
      content={
        <Box>
          <Box id="confirm-modal-description">{content}</Box>
          <Stack mt={2} direction="row" spacing={1} justifyContent="flex-end">
            <Button color="inherit" variant="contained" key="cancel" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" key="assign" onClick={onConfirm}>
              Confirm
            </Button>
          </Stack>
        </Box>
      }
      title={title}
    />
  );
};
