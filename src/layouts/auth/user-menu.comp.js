import * as USER_DUCK from "@/redux/user/user.duck";

import {
  Box,
  Divider,
  ListItemText,
  Menu,
  MenuItem,
  ListItemIcon as MuiListItemIcon,
  styled
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import AccountIcon from "@/components/icons/account.comp";
import ArrowDown from "@/components/icons/arrow-down.comp";
import Button from "./button.comp";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { RoutePathEnum } from "@/components/user-profile/constants/route-paths.const";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";

const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  color: theme.palette.text.primary
}));
const menuItems = [
  {
    title: "My Profile",
    url: RoutePathEnum.PERSIONAL_INFORMATION,
    icon: <AccountIcon />
  }
];

const MenuItemLink = ({ url, onClick, ...rest }) => {
  const history = useHistory();
  const handleClick = () => {
    if (url) history.push(url);
    if (onClick) onClick();
  };
  return <MenuItem onClick={handleClick} sx={{ my: 1 }} {...rest} />;
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
      <Button color="inherit" onClick={handleOpen} id="basic-menu">
        <AccountIcon />
        <ArrowDown color="common.black" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(open)}
        onClose={handleClose}
        sx={{ py: 0, borderRadius: 2 }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: 200,
            marginTop: "15px",
            marginBottom: "-15px",
            overflow: "visible"
          }
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: {
            py: 0
          }
        }}
      >
        <Stack mt={1}>
          <Box my={1} px={2}>
            {username}
          </Box>
          <Divider sx={{ my: 1 }} />
          {menuItems.map((item) => {
            return (
              <MenuItemLink key={item.title} url={item.url} onClick={handleClose}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                {item.title && <ListItemText>{item.title}</ListItemText>}
              </MenuItemLink>
            );
          })}
          <MenuItemLink onClick={logout}>
            <ListItemIcon sx={{ color: "common.black" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </MenuItemLink>
        </Stack>
        <Box position="absolute" top="-22px" right="24px">
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <path d="M11 0L21.3923 11.25H0.607696L11 0Z" fill="white" />
          </svg>
        </Box>
      </Menu>
    </>
  );
};
