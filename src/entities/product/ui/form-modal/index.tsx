import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
export interface BaseFormModalProps {
  open: boolean;
  isLoading?: boolean;
  onClose: () => void;
}
interface Props extends BaseFormModalProps {
  title: string;
  onSave: () => void;
  children: React.ReactNode;
}

const FormModal = ({ open, onClose, title, onSave, children, isLoading }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        pb={3}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "80%",
          bgcolor: "background.paper",
          border: 1,
          borderRadius: 2,
          borderColor: "grey.600",
          boxShadow: (theme) => theme.shadows[1],
          overflow: "hidden",
          width: 440
        }}
      >
        <Stack
          pl={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ backgroundColor: "grey.100" }}
        >
          <Typography
            lineHeight="17px"
            py={1.5}
            id="modal-modal-title"
            variant="body1"
            fontWeight="bold"
          >
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <Close sx={{ color: "common.black" }} />
          </IconButton>
        </Stack>
        <Box px={3} my={3}>
          {children}
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <Button size="large" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton size="large" loading={isLoading} variant="contained" onClick={onSave}>
            Save
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default FormModal;
