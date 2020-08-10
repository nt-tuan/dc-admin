import { List, Skeleton } from "antd";
import { LoadMoreButton, NotificationItem } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as NOTI_DUCK from "redux/notification/notification.duck";
import dayjs from "dayjs";

const NotificationPage = React.memo(() => {
  const [isInit, setIsInit] = useState(true);
  const [page, setPage] = useState(0);
  const notifications = useSelector(NOTI_DUCK.selectNotificationPaginatedList);
  const totalPages = useSelector(NOTI_DUCK.selectTotalPage);
  const { isLoadingMore, isLoadingNewMessage } = useSelector(
    NOTI_DUCK.selectNotificationLoadingState
  );
  const dispatch = useDispatch();
  const itemPerPage = 5;

  useEffect(() => {
    dispatch({ type: NOTI_DUCK.INIT_PAGINATED_MESSAGE, payload: { afterInit, itemPerPage } });
    setPage((page) => page + 1);
  }, [dispatch]);

  const onloadMore = () => {
    dispatch({ type: NOTI_DUCK.LOAD_MESSAGE, payload: { page, itemPerPage } });
    setPage((page) => page + 1);
  };

  const afterInit = () => {
    setIsInit(false);
  };

  const renderLoadmoreBtn = () => {
    return (
      <div className="text-center mt-4 mb-3">
        <LoadMoreButton
          isLoading={isLoadingMore}
          isHide={page > totalPages - 1}
          onLoadMoreClick={onloadMore}
        />
      </div>
    );
  };

  return (
    <article className="air__utils__shadow bg-white dtc-br-10 p-3">
      <h4>Notification list</h4>
      <Skeleton loading={isLoadingNewMessage} active={true} avatar paragraph={{ rows: 1 }} />
      {isInit ? null : (
        <List
          itemLayout="horizontal"
          dataSource={notifications.sort(function (a, b) {
            return dayjs(b.createdDate) - dayjs(a.createdDate);
          })}
          loadMore={renderLoadmoreBtn()}
          renderItem={(item) => (
            <List.Item>
              <NotificationItem data={item} />
            </List.Item>
          )}
        />
      )}
    </article>
  );
});

export default NotificationPage;
