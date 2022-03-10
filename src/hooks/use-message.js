import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import React from "react";

export const MessageContent = ({ content, onClose, variant }) => {
  return (
    <Alert
      onClose={onClose}
      severity={variant}
      action={
        <Button color="inherit" size="small" endIcon={<CloseIcon />}>
          Close
        </Button>
      }
    >
      <Box
        width={400}
        maxWidth={600}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {content}
      </Box>
    </Alert>
  );
};

export const useMessage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const popMessage = React.useCallback(
    (variant) => (content, options) => {
      const key = enqueueSnackbar(
        <MessageContent variant={variant} onClose={() => closeSnackbar(key)} content={content} />,
        { ...options, variant }
      );
    },
    [closeSnackbar, enqueueSnackbar]
  );

  return React.useMemo(() => {
    return {
      error: popMessage("error"),
      info: popMessage("info"),
      success: popMessage("success"),
      warning: popMessage("warning")
    };
  }, [popMessage]);
};
