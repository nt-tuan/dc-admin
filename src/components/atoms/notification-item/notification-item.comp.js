import { Avatar, List } from "antd";
import React from "react";
import styles from "./styles.module.scss";
import { withEnhanceNotification } from "HOCs/withEnhanceNotification";
import { DatetimeUtils } from "utils/date-time.util";

const _NotificationItem = React.memo(({ data, onClick, renderDesc }) => {
  return (
    <List.Item.Meta
      className="dtc-cursor-pointer mr-3 dtc-bg-transparent"
      avatar={
        <Avatar
          icon={<i className="fe fe-shopping-cart" />}
          style={{ color: "#eb2f96", background: "none" }}
        />
      }
      description={
        renderDesc ? (
          renderDesc(styles)
        ) : (
          <div className={styles["item"]} onClick={onClick}>
            <p className="m-0 font-weight-bolder font-size-12" title={data.message}>
              {data.message}
            </p>
            <time className="font-size-10">{DatetimeUtils.fromNow(data.createdDate)}</time>
          </div>
        )
      }
    />
  );
});

export const NotificationItem = withEnhanceNotification(_NotificationItem);
