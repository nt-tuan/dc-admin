import React from "react";
import { matchPath } from "react-router";

import Typography from "@mui/material/Typography";
import { getMenuPreferencesData } from "@/layouts/auth/menu-data";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useHistory, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import MuiListItemButton from "@mui/material/ListItemButton";

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#F5F5F5"
  }
}));
const PreferenceSideBar = () => {
  const menuData = getMenuPreferencesData();

  return (
    <Box
      sx={{
        ml: -6,
        borderRight: "1px solid #ddd"
      }}
    >
      <Typography px={2} variant="h3" fontWeight={"bold"} style={{ padding: "30px 30px 10px" }}>
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

export const PreferencesLayout = ({ children }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        mt: -6,
        mb: -4,
        display: "flex",
        minHeight: "100vh"
      }}
    >
      <PreferenceSideBar />
      <Box pt={3.5} pb={3.5} pl={3.5}>
        {children}
      </Box>
    </Container>
  );
};
