import { Badge, Dropdown } from "antd";
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as NOTI_DUCK from "redux/notification/notification.duck";
import {
  selectHasNewMessage,
  selectNotificationLoadingState,
  selectNotificationPopupList
} from "redux/notification/notification.duck";
import { NotificationList } from "../notification-list/notification-list.comp";
import styles from "./style.module.scss";
import { RouteConst } from "commons/consts";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { setNotificationsRead } from "services";

const _Actions = ({ list, isLoadingNewMessage }) => {
  const dispatch = useDispatch();
  const newMessage = useSelector(selectHasNewMessage);

  const handleViewNotification = () => {
    dispatch({ type: NOTI_DUCK.HAS_VIEW_NEW_MESSAGE });
    asyncErrorHandlerWrapper(async () => await setNotificationsRead());
  };

  const menu = (
    <div className="card air__utils__shadow dtc-br-10">
      <div className="card-body p-0">
        {/* <List2 /> */}
        {/* <div>Hello</div> */}
        <NotificationList
          listData={list}
          isLoading={isLoadingNewMessage}
          viewAllLink={RouteConst.NOTIFICATION}
        />
      </div>
    </div>
  );
  return (
    <Dropdown
      overlay={menu}
      overlayStyle={{ background: "white", borderRadius: 10 }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className={styles.dropdown} onClick={handleViewNotification}>
        {newMessage ? (
          <Badge count={<i className={`${styles["icon-indicator"]} fa fa-circle font-size-13`} />}>
            <i className={`${styles.icon} fa fa-bell ${styles["bell-icon"]}`} />
          </Badge>
        ) : (
          <i className={`${styles.icon} fa fa-bell ${styles["bell-icon"]}`} />
        )}
      </div>
    </Dropdown>
  );
};

export const NotificationPopup = connect((state) => ({
  list: selectNotificationPopupList(state),
  ...selectNotificationLoadingState(state)
}))(_Actions);
