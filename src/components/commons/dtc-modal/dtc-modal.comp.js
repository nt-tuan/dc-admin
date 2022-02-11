import Box from "@mui/material/Box";
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
  maxWidth: "80%",
  bgcolor: "background.paper",
  border: 1,
  borderRadius: 1,
  borderColor: "grey.600",
  shadowBox: (theme) => theme.shadows[1],
  pt: 2,
  pb: 3
};

const contentSizes = {
  large: "80%",
  default: 600,
  small: 500
};
export const DTCModal = ({ open, onClose, title, content, size = "default" }) => {
  return (
    <Modal width={450} open={open} onClose={onClose}>
      <Box sx={style} width={contentSizes[size]}>
        <Stack px={4} direction="row" alignItems="center" justifyContent="space-between">
          <Typography id="confirm-modal-title" variant="h4">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mt: 2 }} />
        {content && (
          <Box px={4} mt={4} id="confirm-modal-description">
            {content}
          </Box>
        )}
      </Box>
    </Modal>
  );
};
