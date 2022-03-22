import { useHistory, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { matchPath } from "react-router";
import { styled } from "@mui/system";

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  "&.Mui-selected": {
    backgroundColor: theme.palette.grey[100]
  }
}));
export const SubSidebar = ({ menuData, header, divider }) => {
  return (
    <Box height="100%" borderRight={1} borderColor="grey.300">
      <Typography variant="h5" fontWeight="bold" px={3} pt={3} pb={2}>
        {header}
      </Typography>
      <List>
        {menuData.map((item) => (
          <React.Fragment key={item.key}>
            <ListItem disablePadding>
              <MenuItem menu={item} />
            </ListItem>
            {divider}
          </React.Fragment>
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
  if (menu.url)
    return (
      <ListItemButton onClick={handleOnClickMenu} selected={selected}>
        <Typography component="div" variant="body2">
          {menu.title}
        </Typography>
      </ListItemButton>
    );
  return (
    <Typography px={3} py={1} variant="body2">
      {menu.title}
    </Typography>
  );
};

export const SubLayout = ({ children, menuData, header, divider }) => {
  return (
    <Stack height="100%" direction="row" alignItems="stretch">
      <Box width={238} flexShrink={0}>
        <SubSidebar menuData={menuData} header={header} divider={divider} />
      </Box>
      <Box height="100%" flexGrow={1} sx={{ overflowY: "auto" }}>
        <Box p={3}>{children}</Box>
      </Box>
      <Box></Box>
    </Stack>
  );
};
