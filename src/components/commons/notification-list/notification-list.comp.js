import { NotificationItem } from "./notification-item.comp";
import React from "react";
import List from "@mui/material/List";
import ListButtonItem from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Skeleton from "@mui/material/Skeleton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/system/useTheme";

const LoadingItem = () => {
  const theme = useTheme();
  return (
    <>
      <ListButtonItem>
        <ListItemIcon>
          <ShoppingCartIcon sx={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              <Skeleton sx={{ width: "100%" }} />
              <Skeleton sx={{ width: "100%" }} />
            </>
          }
        />
      </ListButtonItem>
    </>
  );
};
const LoadingList = () => {
  return (
    <List>
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </List>
  );
};

export const NotificationList = ({ listData, isLoading, className, size }) => {
  return (
    <div className={className}>
      {listData && (
        <List>
          {listData.map((item) => (
            <NotificationItem size={size} key={item.createdDate} data={item} />
          ))}
        </List>
      )}
      {isLoading && <LoadingList />}
    </div>
  );
};
