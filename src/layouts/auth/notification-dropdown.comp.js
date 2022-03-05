import { Divider, Link, Popover, Typography } from "@mui/material";
import {
  HAS_VIEW_NEW_MESSAGE,
  selectHasNewMessage,
  selectNotificationLoadingState,
  selectNotificationPopupList
} from "redux/notification/notification.duck";
import { useDispatch, useSelector } from "react-redux";

import Badge from "@mui/material/Badge";
import { Box } from "@mui/system";
import Button from "./button.comp";
import NotificationIcon from "@/components/icons/notification.comp";
import { NotificationList } from "components/commons/notification-list/notification-list.comp";
import React from "react";
import { RouteConst } from "commons/consts";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { setNotificationsRead } from "services";
import { useHistory } from "react-router-dom";

export const NotificationDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch({ type: HAS_VIEW_NEW_MESSAGE });
    asyncErrorHandlerWrapper(() => setNotificationsRead());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "notification-list" : undefined;
  const notificationList = useSelector(selectNotificationPopupList);
  const { isLoadingMore, isLoadingNewMessage } = useSelector(selectNotificationLoadingState);
  const hasNewMessage = useSelector(selectHasNewMessage);
  const handleViewAll = () => {
    history.push(RouteConst.NOTIFICATION);
    handleClose();
  };
  return (
    <>
      <Button color="inherit" onClick={handleClick} aria-describedby={id}>
        <Badge variant="dot" color="error" invisible={!hasNewMessage}>
          <NotificationIcon />
        </Badge>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Box sx={{ width: "335px", height: "360px", display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" sx={{ margin: "6px 16px", fontWeight: "bold" }}>
            Notifications
          </Typography>
          <Divider />
          <Box sx={{ flex: "1 1 0", height: 0, overflowX: "auto" }}>
            <Box sx={{ padding: "16px 0" }}>
              <NotificationList
                listData={notificationList}
                isLoading={isLoadingNewMessage || isLoadingMore}
                size="small"
              />
            </Box>
          </Box>
          <Divider />
          <Link underline="none" onClick={handleViewAll}>
            <Typography sx={{ textAlign: "center", padding: "16px 0" }}>View All</Typography>
          </Link>
        </Box>
      </Popover>
    </>
  );
};
