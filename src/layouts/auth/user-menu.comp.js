import React from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import * as USER_DUCK from "redux/user/user.duck";
import { useDispatch, useSelector } from "react-redux";
import { RouteConst, USER_TABS_NAME } from "commons/consts";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
const menuItems = [
  {
    title: "My Profile",
    url: `/admin/profile/${USER_TABS_NAME.profileInfo}`,
    icon: <PersonIcon />
  },
  {
    title: "User Management",
    url: RouteConst.ADMIN_USER_MANAGEMENT,
    icon: <GroupIcon />
  }
];

const MenuItemLink = ({ url, ...rest }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(url);
  };
  return <MenuItem onClick={handleClick} {...rest} />;
};

export const UserMenu = () => {
  const [open, setOpen] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState();
  const username = useSelector(USER_DUCK.selectUsername);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: USER_DUCK.LOGOUT
    });
  };
  const handleOpen = (e) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleOpen} id="basic-menu" color="default">
        <AccountCircleIcon />
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(open)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <Box sx={{ padding: "6px 16px" }}>
          <div>
            <strong>{username}</strong>
          </div>
          <div>User</div>
        </Box>
        <Divider sx={{ margin: "8px 4px" }} />
        {menuItems.map((item) => {
          return (
            <MenuItemLink key={item.title} url={item.url}>
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              {item.title && <ListItemText>{item.title}</ListItemText>}
            </MenuItemLink>
          );
        })}
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
