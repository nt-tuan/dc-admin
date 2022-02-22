import * as React from "react";

import { Link } from "react-router-dom";
import { Box, List, Typography } from "@mui/material";
import { RouteConst } from "commons/consts";
import { useStateProvider } from "hooks/state-provider";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuItem from "./app-menu-item.comp";

const SettingsMenu = ({ collapsed, onExpand }) => {
  const [state] = useStateProvider();

  const rendersHeaderSettingsMenu = React.useMemo(() => {
    return (
      <Box display="flex" flexDirection="column" mb={2} ml={2.5}>
        <Box component="div" marginBottom={4} width={8}>
          <Link underline="none" to={RouteConst.HOME_ROUTE}>
            <Box display="flex" color="#F0F0F0" fontSize="14" alignItems="center">
              <KeyboardBackspaceIcon />
              <Box pl={0.5}>{!collapsed && "Back"}</Box>
            </Box>
          </Link>
        </Box>
        <Typography variant="h3">{!collapsed && "Settings"}</Typography>
      </Box>
    );
  }, [state?.isSettingsMenu, collapsed]);

  return (
    <List>
      <Box>{rendersHeaderSettingsMenu}</Box>
      {state?.menu?.map((item) => {
        return (
          <List key={item.key}>
            <MenuItem data={item} collapsed={collapsed} onExpand={onExpand} />
          </List>
        );
      })}
    </List>
  );
};

export default React.memo(SettingsMenu);
