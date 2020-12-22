import React from "react";
import { Radio } from "antd";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};
function TwoFAFrequency({ handleSettingChange, setting }) {
  return (
    <div className="row mt-5" gutter={[16, 16]}>
      <div className="col-12 col-sm-6">
        <h5>Enable Two-Factor Authentication (2FA)</h5>
        <div>
          Two-factor authentication (2FA) requires users to enter a one-time verification code sent
          using your preferred channel in order to access your account.
        </div>
      </div>
      <div className="col-12 col-sm-6">
        <Radio.Group value={setting} onChange={handleSettingChange} style={radioStyle}>
          <Radio value="PER_30_DAYS">
            Once per computer. Trust this computer and only ask for verification code every 30 days
          </Radio>
          <Radio value="EVERY_LOGIN" style={radioStyle}>
            Every log-in. We'll always ask for a verification code
          </Radio>
        </Radio.Group>
      </div>
    </div>
  );
}

export default TwoFAFrequency;
