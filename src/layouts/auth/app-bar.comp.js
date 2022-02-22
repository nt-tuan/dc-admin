import { Link } from "react-router-dom";
import { getAssetURL, getCompanyName } from "utils/config.util";

import Stack from "@mui/material/Stack";
import MuiAppBar from "@mui/material/AppBar";
import { NotificationDropdown } from "./notification-dropdown.comp";
import React from "react";
import { RouteConst } from "commons/consts";
import Toolbar from "@mui/material/Toolbar";
import { UserMenu } from "./user-menu.comp";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useBreakpoints } from "utils/use-breakpoints";
import WalletIcon from "@/components/icons/wallet.comp";
import Button from "./button.comp";

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  backgroundColor: theme.palette.grey[100],
  boxShadow: theme.shadows[0],
  borderBottom: "1px solid",
  borderBottomColor: theme.palette.divider,
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  height: 50,
  ...(open && {
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
        variant="dense"
        disableGutters
        sx={{
          paddingLeft: 2,
          paddingRight: 1,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Link to={getAssetURL()}>
          <Box display="flex" alignItems="center" justifyContent="center" height={40}>
            <img
              style={{ height: "100%", objectFit: "contain" }}
              src={getAssetURL(`/images/${isSmall ? "logo-notext.png" : "logo.png"}`)}
              alt={`${getCompanyName()}`}
            />
          </Box>
        </Link>
        <Stack direction="row" alignItems="center">
          <NotificationDropdown />
          <Link to={RouteConst.WALLET}>
            <Button color="inherit" variant="text">
              <WalletIcon sx={{ color: "common.black" }} />
            </Button>
          </Link>
          <UserMenu />
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};
