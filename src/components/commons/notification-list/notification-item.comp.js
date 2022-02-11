import { Box, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";

import { DatetimeUtils } from "utils/date-time.util";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { withEnhanceNotification } from "HOCs/withEnhanceNotification";

const contentMessageStyle = {
  small: { fontSize: (theme) => theme.typography.body2.fontSize }
};
const contentMetaStyle = {
  small: (theme) => theme.typography.caption
};
const ContentMessage = styled(Box)(({ theme, size }) => ({
  fontWeight: "bolder",
  fontSize: theme.typography.fontSize
}));
const ContentMeta = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize
}));
const Content = ({ message, createdDate, size }) => {
  return (
    <Box sx={{ wordBreak: "break-word" }}>
      <ContentMessage sx={contentMessageStyle[size]}>{message}</ContentMessage>
      <ContentMeta size={size} sx={contentMetaStyle[size]}>
        {DatetimeUtils.fromNow(createdDate)}
      </ContentMeta>
    </Box>
  );
};

const _NotificationItem = React.memo(({ data, onClick, size }) => {
  return (
    <ListItemButton onClick={onClick} sx={{ alignItems: "flex-start" }}>
      <ListItemIcon sx={{ paddingTop: "8px", color: (theme) => theme.palette.primary.main }}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary={<Content {...data} size={size} />} />
    </ListItemButton>
  );
});

export const NotificationItem = withEnhanceNotification(_NotificationItem);
