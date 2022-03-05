import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const Popconfirm = ({ id, children, title, onConfirm, onCancel, okText, cancelText }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCancel = () => {
    setAnchorEl(null);
    if (onCancel) onCancel();
  };
  const handleConfirm = () => {
    onConfirm();
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const currentId = open ? id : null;
  return (
    <Box>
      <Box title={title} aria-describedby={currentId} onClick={handleClick}>
        {children}
      </Box>
      <Popover
        id={currentId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCancel}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <Box px={4} py={2}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5">{title}</Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={handleConfirm}>
                {okText || "Ok"}
              </Button>
              <Button variant="contained" onClick={handleCancel}>
                {cancelText || "Cancel"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </Box>
  );
};
