import { Link, Link as RLink } from "react-router-dom";
import { getAssetURL, getCompanyName } from "utils/config.util";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiAppBar from "@mui/material/AppBar";
import { NotificationDropdown } from "./notification-dropdown.comp";
import React from "react";
import { RouteConst } from "commons/consts";
import Toolbar from "@mui/material/Toolbar";
import { UserMenu } from "./user-menu.comp";
import { drawerWidth } from "./app-side-bar.comp";
import { styled } from "@mui/material/styles";
import { useBreakpoints } from "utils/useBreakpoints";

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  boxShadow: theme.shadows[0],
  borderBottom: "1px solid",
  borderBottomColor: theme.palette.divider,
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: theme.spacing(7),
  width: `calc(100% - ${theme.spacing(7)})`,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export const AppBar = ({ open }) => {
  const { isSmall } = useBreakpoints();

  return (
    <StyledAppBar position="absolute" open={open} color="inherit">
      <Toolbar
        sx={{
          pr: "24px" // keep right padding when drawer closed
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Link to={getAssetURL()}>
            <img
              style={{ maxHeight: 40 }}
              src={getAssetURL(`/images/${isSmall ? "logo-notext.png" : "logo.png"}`)}
              alt={`${getCompanyName()}`}
            />
          </Link>
        </Box>
        <NotificationDropdown />
        <RLink to={RouteConst.WALLET}>
          <IconButton color="primary">
            <AccountBalanceWalletIcon />
          </IconButton>
        </RLink>
        <UserMenu />
      </Toolbar>
    </StyledAppBar>
  );
};
