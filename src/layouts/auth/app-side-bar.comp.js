import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { AppLeftMenu } from "./app-left-menu.comp";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { selectUsername } from "redux/user/user.duck";
import { styled } from "@mui/material/styles";
import { useBreakpoints } from "utils/useBreakpoints";
import { useSelector } from "react-redux";

export const drawerWidth = 300;
const MobileDrawer = styled(MuiDrawer)(({ theme }) => ({
  visibility: "visible",
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    boxSizing: "border-box"
  }
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7)
      })
    }
  })
);

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export const AppSideBar = ({ open, onToggle, onExpand }) => {
  const username = useSelector(selectUsername);
  const { isSmall } = useBreakpoints();
  const content = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-end" : "center",
          px: [1]
        }}
      >
        <IconButton sx={{ color: "#fff" }} onClick={onToggle}>
          {open ? <KeyboardDoubleArrowLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
      <Stack direction="row" sx={{ marginLeft: open ? "8px" : "0", alignItems: "center" }}>
        <Item>
          <Avatar variant="rounded" sx={{ backgroundColor: "grey.300" }}>
            <AdminPanelSettingsIcon sx={{ color: "primary.main" }} />
          </Avatar>
        </Item>
        {open && (
          <Item
            sx={{
              fontSize: "h6.fontSize",
              fontWeight: "bolder",
              color: "common.white"
            }}
          >
            {username}
          </Item>
        )}
      </Stack>
      <AppLeftMenu collapsed={!open} onExpand={onExpand} />
    </>
  );
  if (isSmall && open)
    return (
      <MobileDrawer anchor="left" variant="temporary" open onClose={onToggle}>
        <div>{content}</div>
      </MobileDrawer>
    );
  return (
    <Drawer
      variant="permanent"
      open={open}
      ModalProps={{
        keepMounted: true
      }}
    >
      {content}
    </Drawer>
  );
};
