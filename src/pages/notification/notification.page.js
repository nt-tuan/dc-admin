import * as NOTI_DUCK from "@/redux/notification/notification.duck";

import { Box, Divider } from "@mui/material";
import { DTCSection, LoadMoreButton } from "@/components/commons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Helmet } from "react-helmet";
import { NotificationList } from "@/components/commons/notification-list/notification-list.comp";

const NotificationPage = React.memo(() => {
  const [page, setPage] = useState(0);
  const notifications = useSelector(NOTI_DUCK.selectNotificationPaginatedList);
  const totalPages = useSelector(NOTI_DUCK.selectTotalPage);
  const { isLoadingMore, isLoadingNewMessage } = useSelector(
    NOTI_DUCK.selectNotificationLoadingState
  );
  const dispatch = useDispatch();
  const itemPerPage = 5;

  useEffect(() => {
    dispatch({ type: NOTI_DUCK.INIT_PAGINATED_MESSAGE, payload: { itemPerPage } });
    setPage((page) => page + 1);
  }, [dispatch]);

  const onloadMore = () => {
    dispatch({ type: NOTI_DUCK.LOAD_MESSAGE, payload: { page, itemPerPage } });
    setPage((page) => page + 1);
  };

  return (
    <DTCSection>
      <Helmet title="Notifications" />
      <DTCSection.Header>Notification list</DTCSection.Header>
      <DTCSection.Content>
        <NotificationList
          listData={notifications}
          isLoading={isLoadingMore || isLoadingNewMessage}
        />
        <Divider sx={{ my: "8px" }} />
        <Box sx={{ textAlign: "center" }}>
          <LoadMoreButton
            isLoading={isLoadingMore}
            isHide={page > totalPages - 1}
            onLoadMoreClick={onloadMore}
          />
        </Box>
      </DTCSection.Content>
    </DTCSection>
  );
});

export default NotificationPage;
