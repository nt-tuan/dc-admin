import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export const SuccessAlert = ({ content, onClose }) => {
  return (
    <Alert onClose={onClose} severity="success">
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
