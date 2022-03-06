import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import React from "react";
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
  py: 3
};

const contentSizes = {
  large: "80%",
  default: 600,
  small: 416,
  tiny: 324
};
export const DTCModal = ({ open, onClose, title, content, width = 450, size = "default" }) => {
  return (
    <Modal width={width} open={open} onClose={onClose}>
      <Box sx={style} width={contentSizes[size]}>
        {title && (
          <Typography px={3} component="div" id="confirm-modal-title" variant="h5">
            {title}
          </Typography>
        )}
        {content && (
          <Box px={3} mt={2} id="confirm-modal-description">
            {content}
          </Box>
        )}
        <Box position="absolute" top={1} right={1}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};
