import * as React from "react";

import { useHistory, useLocation } from "react-router-dom";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@/components/icons/keyboard-up.comp";
import ExpandMore from "@/components/icons/keyboard-down.comp";
import MuiList from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { matchPath } from "react-router";
import { styled } from "@mui/system";
const List = styled(MuiList)({
  paddingTop: 0,
  paddingBottom: 0
});
const ListItemIcon = styled(MuiListItemIcon)({
  color: "inherit",
  width: 20
});
const ListItemText = styled(MuiListItemText)({
  color: "inherit"
});
const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  justifyContent: "center",
  padding: "16px",
  height: 52,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    ":hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white
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
  const location = useLocation();
  const [open, setOpen] = React.useState(() => {
    if (matchPath(location.pathname, { path: data.url })) return true;
    return isChildrenMatchPath(data, location);
  });
  const history = useHistory();
  const canCollapse = !collapsed && data.children != null && data.children.length > 0;
  const selected = React.useMemo(() => {
    if (matchPath(location.pathname, { path: data.url })) return true;
    return (collapsed || !open) && isChildrenMatchPath(data, location);
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
  const Icon = data.icon;

  return (
    <div>
      <ListItemButton onClick={handleClick} selected={selected}>
        <ListItemIcon sx={{ minWidth: "0" }}>{Icon && <Icon fontSize="small" />}</ListItemIcon>
        {!collapsed && (
          <ListItemText
            sx={{ paddingLeft: 1 }}
            primary={<Typography variant="body2">{data.title}</Typography>}
          />
        )}
        {canCollapse &&
          !collapsed &&
          (open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />)}
      </ListItemButton>
      {canCollapse && !collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.children.map((childData) => (
              <MenuItem key={childData.key} data={childData} onExpand={onExpand} />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};

export const AppLeftMenu = ({ collapsed, onExpand, menuData }) => {
  return (
    <List>
      {menuData.map((item) => {
        return (
          <List key={item.key}>
            <MenuItem data={item} collapsed={collapsed} onExpand={onExpand} />
          </List>
        );
      })}
    </List>
  );
};
