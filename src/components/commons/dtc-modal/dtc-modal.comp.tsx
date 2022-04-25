import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import React from "react";
import Typography from "@mui/material/Typography";
import { Loader } from "../loader/loader.comp";
import { SxProps, Theme } from "@mui/material/styles";

const style: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  bgcolor: "background.paper",
  border: 1,
  borderRadius: 1,
  borderColor: "grey.600",
  boxShadow: (theme) => theme.shadows[1],
  py: 3
};

const contentSizes = {
  large: "80%",
  medium: 600,
  default: 600,
  small: 416,
  tiny: 324
};
interface Props {
  open?: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  isLoading?: boolean;
  size: "large" | "medium" | "small" | "tiny" | "default";
  content?: React.ReactNode;
}
export const DTCModal = ({
  open,
  onClose,
  title,
  content,
  isLoading = false,
  size = "default"
}: Props) => {
  return (
    <Modal open={Boolean(open)} onClose={onClose}>
      <Box sx={style} width={contentSizes[size]}>
        {title && (
          <Typography
            px={3}
            textAlign="center"
            component="div"
            id="confirm-modal-title"
            fontSize="16px"
            lineHeight="24px"
            fontWeight="bold"
          >
            {title}
          </Typography>
        )}
        {isLoading && <Loader />}
        {!isLoading && content && (
          <Box px={3} mt={2} id="confirm-modal-description">
            {content}
          </Box>
        )}
        <Box position="absolute" top={1} right={1}>
          <IconButton onClick={onClose} sx={{ color: "common.black" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};
