import { useHistory, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MuiListItemButton from "@mui/material/ListItemButton";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { matchPath } from "react-router";
import { styled } from "@mui/system";

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.grey[100]
  }
}));
export const SubSidebar = ({ menuData }) => {
  return (
    <Box borderRight={1} borderColor="grey.300" width="238px">
      <Typography variant="h5" fontWeight="bold" px={3} pt={3} pb={2}>
        Preferences
      </Typography>
      <List>
        {menuData.map((menu) => (
          <ListItem disablePadding key={menu.key}>
            <MenuItem menu={menu} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const MenuItem = ({ menu }) => {
  const location = useLocation();
  const history = useHistory();

  const selected = React.useMemo(() => {
    return !!matchPath(location.pathname, { path: menu.url });
  }, [location, menu]);

  const handleOnClickMenu = () => {
    if (menu.url) {
      history.push(menu.url);
    }
  };

  return (
    <ListItemButton onClick={handleOnClickMenu} selected={selected}>
      <ListItemText primary={menu.title} />
    </ListItemButton>
  );
};

export const SubLayout = ({ children, menuData }) => {
  return (
    <Stack height="100%" direction="row" alignItems="stretch">
      <SubSidebar menuData={menuData} />
      <Box p={3} flexGrow={1}>
        {children}
      </Box>
    </Stack>
  );
};
