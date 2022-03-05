import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: 1,
  borderRadius: 1,
  borderColor: "grey.600",
  shadowBox: (theme) => theme.shadows[1],
  pt: 2,
  pb: 3
};
export const ConfirmModal = ({ showForm, onClose, innerText, title, onConfirmLock }) => {
  return (
    <Modal
      width={450}
      open={showForm}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box sx={style} direction="column">
        <Stack px={4} direction="row" alignItems="center" justifyContent="space-between">
          <Typography id="confirm-modal-title" variant="h5">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />
        <Box px={4} mt={4} id="confirm-modal-description">
          {innerText}
        </Box>
        <Stack px={4} mt={2} direction="row" spacing={1} justifyContent="flex-end">
          <Button color="inherit" variant="contained" key="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" key="assign" onClick={onConfirmLock}>
            Confirm
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
