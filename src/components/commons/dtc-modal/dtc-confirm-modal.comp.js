import Box from "@mui/material/Box";
import { DTCModal } from "./dtc-modal.comp";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import Stack from "@mui/material/Stack";
export const DTCConfirmModal = ({ open, onClose, content, title, onConfirm, loading }) => {
  return (
    <DTCModal
      open={open}
      onClose={onClose}
      content={
        <Box>
          <Box id="confirm-modal-description">{content}</Box>
          <Stack mt={2} direction="row" spacing={1} justifyContent="flex-end">
            <LoadingButton
              loading={loading}
              color="inherit"
              variant="contained"
              key="cancel"
              onClick={onClose}
            >
              Cancel
            </LoadingButton>
            <LoadingButton loading={loading} variant="contained" key="assign" onClick={onConfirm}>
              Confirm
            </LoadingButton>
          </Stack>
        </Box>
      }
      title={title}
    />
  );
};
