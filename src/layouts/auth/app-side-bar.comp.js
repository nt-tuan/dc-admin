import { AppFooter } from "./app-footer.comp";
import { AppLeftMenu } from "./app-left-menu.comp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CollapseIcon from "@/components/icons/collapse.comp";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useBreakpoints } from "utils/use-breakpoints";

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
      height: "100%",
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
      <Stack alignItems="stretch" pt="20px">
        {header}
        <AppLeftMenu collapsed={!open} onExpand={onExpand} menuData={menuData} />
      </Stack>
      <Stack spacing={1}>
        <AppFooter collapse={!open} />
        <Box
          sx={{
            backgroundColor: "grey.300"
          }}
        >
          <Button
            color="inherit"
            sx={{ width: "100%", height: 40, minWidth: 0 }}
            onClick={onToggle}
          >
            <Stack height="100%" alignItems="center" justifyContent="center">
              {open ? <CollapseIcon /> : <MenuIcon fontSize="small" />}
            </Stack>
          </Button>
        </Box>
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
