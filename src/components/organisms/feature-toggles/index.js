import React from "react";
import { List, notification } from "antd";
import FeatureItem from "./feature-item.comp";

export const FeatureToggles = ({ featureFlags }) => {
  const [notificationApi, contextHolder] = notification.useNotification();

  return (
    <div className="air__utils__shadow bg-white">
      {contextHolder}
      <List
        header={
          <div className="pl-4 pr-4">
            You can control the specific features in your marketplace by providing appropriate
            selection.
          </div>
        }
        dataSource={featureFlags}
        renderItem={(item) => <FeatureItem notificationApi={notificationApi} featureFlag={item} />}
      />
    </div>
  );
};
