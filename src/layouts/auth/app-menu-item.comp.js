import * as React from "react";

import { useHistory, useLocation } from "react-router-dom";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import { matchPath } from "react-router";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material";

const ListItemIcon = styled(MuiListItemIcon)({
  color: "inherit"
});
const ListItemText = styled(MuiListItemText)({
  color: "inherit"
});
const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  color: theme.palette.common.white,
  "&.Mui-selected": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    ":hover": {
      backgroundColor: theme.palette.common.white
    }
  }
}));

const isChildrenMatchPath = (data, location) => {
  return (
    data.children &&
    data.children.some((child) => matchPath(location.pathname, { path: child.url }))
  );
};

const MenuItem = ({ data, collapsed, onExpand }) => {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(() => {
    if (matchPath(location.pathname, { path: data.url })) return true;
    if (isChildrenMatchPath(data, location)) return true;
    return false;
  });
  const history = useHistory();
  const canCollapse = !collapsed && data.children != null && data.children.length > 0;
  const selected = React.useMemo(() => {
    if (matchPath(location.pathname, { path: data.url })) return true;
    if ((collapsed || !open) && isChildrenMatchPath(data, location)) return true;
    return false;
  }, [location, data, collapsed, open]);
  const handleClick = () => {
    if (data.url) {
      history.push(data.url);
      return;
    }
    if (collapsed) {
      onExpand();
      setOpen(true);
      return;
    }
    if (canCollapse) {
      setOpen((currentOpen) => !currentOpen);
    }
  };

  return (
    <div>
      <ListItemButton
        onClick={handleClick}
        selected={selected}
        sx={{
          backgroundColor: open ? theme.palette.primary.dark : undefined,
          justifyContent: "center"
        }}
      >
        <ListItemIcon sx={{ minWidth: "0" }}>{data.icon}</ListItemIcon>
        {!collapsed && <ListItemText sx={{ paddingLeft: "10px" }} primary={data.title} />}
        {canCollapse && !collapsed && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {canCollapse && !collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              backgroundColor: theme.palette.primary.dark
            }}
          >
            {data.children.map((childData) => (
              <MenuItem key={childData.key} data={childData} onExpand={onExpand} />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};
export default React.memo(MenuItem);
