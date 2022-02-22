import { AppLeftMenu } from "./app-left-menu.comp";
import IconButton from "@mui/material/IconButton";
import CollapseIcon from "@/components/icons/collapse.comp";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { useBreakpoints } from "utils/use-breakpoints";
import { AppFooter } from "./app-footer.comp";

export const drawerWidth = 240;
const MobileDrawer = styled(MuiDrawer)(({ theme }) => ({
  visibility: "visible",
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.palette.grey[100],
    boxSizing: "border-box"
  }
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      marginTop: 50,
      height: "calc(100% - 50px)",
      whiteSpace: "nowrap",
      width: drawerWidth,
      backgroundColor: theme.palette.grey[100],
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

export const AppSideBar = ({ open, onToggle, onExpand, menuData, header }) => {
  const { isSmall } = useBreakpoints();
  const content = (
    <Stack height="100%" justifyContent="space-between">
      <Stack alignItems="stretch">
        {header}
        <AppLeftMenu collapsed={!open} onExpand={onExpand} menuData={menuData} />
      </Stack>
      <Stack spacing={1}>
        <AppFooter collapse={!open} />
        <Toolbar
          sx={{
            backgroundColor: "grey.300",
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "flex-end" : "center",
            px: [1]
          }}
        >
          <IconButton sx={{ width: "100%" }} onClick={onToggle}>
            {open ? <CollapseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </Stack>
    </Stack>
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
