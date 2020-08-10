import { List, Skeleton } from "antd";
import { NotificationItem } from "components";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";

export const NotificationList = ({ listData, isLoading, viewAllLink }) => {
  return (
    <div className="text-gray-6 p-3">
      <h5>Notifications</h5>
      <hr className="mt-2 mb-2" />
      <Scrollbars autoHide={true} style={{ height: 250, width: 300 }}>
        <Skeleton loading={isLoading} active={true} avatar paragraph={{ rows: 1 }} />
        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={(item) => <NotificationItem data={item} />}
        />
      </Scrollbars>
      <hr className="mt-2 mb-2" />
      <div className="text-center">
        <Link to={viewAllLink}>View All</Link>
      </div>
    </div>
  );
};
