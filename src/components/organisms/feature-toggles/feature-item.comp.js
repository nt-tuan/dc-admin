import React, { useState } from "react";
import { List, Switch } from "antd";
import "./feature-item.comp.scss";
import { FeatureFlagService } from "services/feature-flag.service";

function FeatureItem({ featureFlag, notificationApi }) {
  const [enabled, setEnabled] = useState(featureFlag.enabled);

  const handleToggle = async (isCheck) => {
    const toggleActionSuccess = isCheck ? "enabled" : "disabled";
    const toggleActionFail = isCheck ? "enable" : "disable";
    try {
      await FeatureFlagService.updateFeatureFlag(featureFlag.id, isCheck);
      setEnabled(isCheck);
      notificationApi.success({
        message: `${featureFlag.name} has been successfully ${toggleActionSuccess} in your Marketplace`,
        placement: "topRight"
      });
    } catch (_err) {
      notificationApi.error({
        message: `${featureFlag.name} has been failed to ${toggleActionFail} in your Marketplace`,
        placement: "topRight"
      });
    }
  };

  return (
    <List.Item className="pl-4 pr-4 feature-flag d-flex justify-content-between">
      <div className="feature-flag__content">
        <div className="feature-flag__content__title">{featureFlag.name}</div>
        <div className="feature-flag__content__desc text-faded">{featureFlag.description}</div>
      </div>
      <div className="feature-flag__toggle">
        <Switch
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={handleToggle}
          checked={enabled}
        />
      </div>
    </List.Item>
  );
}

export default FeatureItem;
