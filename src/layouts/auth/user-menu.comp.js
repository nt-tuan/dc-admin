import React from "react";
import Button from "./button.comp";
import Stack from "@mui/material/Stack";
import {
  Box,
  Divider,
  ListItemIcon as MuiListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled
} from "@mui/material";
import * as USER_DUCK from "redux/user/user.duck";
import { useDispatch, useSelector } from "react-redux";
import { RouteConst, USER_TABS_NAME } from "commons/consts";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import AccountIcon from "@/components/icons/account.comp";
import ArrowDown from "@/components/icons/arrow-down.comp";

const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  color: theme.palette.text.primary
}));
const menuItems = [
  {
    title: "My Profile",
    url: `/admin/profile/${USER_TABS_NAME.profileInfo}`,
    icon: <AccountIcon />
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
              <MenuItemLink key={item.title} url={item.url}>
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
