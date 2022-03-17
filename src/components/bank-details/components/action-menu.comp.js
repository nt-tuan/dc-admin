import React from "react";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DeleteBankConfirm } from "./delete-bank-confirm.comp";

export const ActionMenu = ({ id }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="inherit"
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizRoundedIcon />
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{ color: "error.main" }} onClick={() => setDeleteConfirmOpen(true)}>
          <ListItemIcon>
            <DeleteOutlinedIcon sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText>Delete Bank Account</ListItemText>
        </MenuItem>
      </Menu>
      <DeleteBankConfirm
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        id={id}
      />
    </div>
  );
};
