import React, { useState, useEffect } from "react";
import { Button, Checkbox, message } from "antd";
import { useSelector } from "react-redux";
//** components */
import * as USER_DUCK from "redux/user/user.duck";

import { TWO_FACTOR_AUTH_TYPES } from "commons/consts";
import { update2FASettings, forgetBrowser } from "services/two-factor-auth.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { selectBrowserFingerprint } from "redux/settings/settings.duck";

import TwoFAFrequency from "./2FA-frequency";
import Method2FA from "./method-2FA";

const getTwoFAType = (method, setting) => {
  if (setting === TWO_FACTOR_AUTH_TYPES.PER_30_DAYS) {
    if (method === "EMAIL") return TWO_FACTOR_AUTH_TYPES.EMAIL_PER_30_DAYS;
    else if (method === "SMS") return TWO_FACTOR_AUTH_TYPES.SMS_PER_30_DAYS;
    else if (method === "GA") return TWO_FACTOR_AUTH_TYPES.GA_PER_30_DAYS;
    else return TWO_FACTOR_AUTH_TYPES.WHATSAPP_PER_30_DAYS;
  } else {
    if (method === "EMAIL") return TWO_FACTOR_AUTH_TYPES.EMAIL_EVERY_LOGIN;
    else if (method === "SMS") return TWO_FACTOR_AUTH_TYPES.SMS_EVERY_LOGIN;
    else if (method === "GA") return TWO_FACTOR_AUTH_TYPES.GA_EVERY_LOGIN;
    else return TWO_FACTOR_AUTH_TYPES.WHATSAPP_EVERY_LOGIN;
  }
};

function TwoStepAuthentication() {
  const user2FASettings = useSelector(USER_DUCK.select2FASettings);

  const [selectedMethod, setSelectedMethod] = useState(user2FASettings.tfaMethod);
  const [setting, setSetting] = useState(user2FASettings.tfaType);
  const isPhoneVerified = useSelector(USER_DUCK.selectPhoneVerified);
  const isGAVerified = useSelector(USER_DUCK.selectGAVerified);

  const [is2FA, setIs2FA] = useState(user2FASettings.tfaType !== "DISABLE");
  const BrowserFingerprint = useSelector(selectBrowserFingerprint);

  //** Handle :: Update 2FA Settings  */
  const handleUpdate = () => {
    let tfaType = getTwoFAType(selectedMethod, setting);
    asyncErrorHandlerWrapper(async () => {
      await update2FASettings({ tfaType: tfaType, browserId: BrowserFingerprint });
      message.success("Update Successful");
    });
  };

  useEffect(() => {
    setSelectedMethod(user2FASettings.tfaType === "DISABLE" ? "EMAIL" : user2FASettings.tfaMethod);
    setSetting(user2FASettings.tfaType === "DISABLE" ? "PER_30_DAYS" : user2FASettings.tfaType);
  }, [user2FASettings.tfaMethod, user2FASettings.tfaType]);

  useEffect(() => {
    setIs2FA(user2FASettings.tfaType !== "DISABLE");
  }, [user2FASettings]);

  //** Handle checkbox :: "Enable two step authentication" */
  const handle2FACheckboxChange = (e) => {
    const checked = e.target.checked;
    if (checked === false) {
      asyncErrorHandlerWrapper(async () => {
        await update2FASettings({
          tfaType: TWO_FACTOR_AUTH_TYPES.DISABLED,
          browserId: BrowserFingerprint
        });
        message.success("Successful");
      });
    }
    setIs2FA(!is2FA);
  };

  const handleForgetThisComputer = () => {
    asyncErrorHandlerWrapper(async () => {
      await forgetBrowser({ browserId: BrowserFingerprint });
      message.success("Successful");
    });
  };

  //** Handle Change Radio */
  const handleSettingChange = (e) => {
    setSetting(e.target.value);
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <div>
      <h5>Two-Step Authentication</h5>
      <div>
        <Checkbox checked={is2FA} onChange={handle2FACheckboxChange}>
          Enable two step authentication
        </Checkbox>
      </div>
      {is2FA ? (
        <>
          <TwoFAFrequency handleSettingChange={handleSettingChange} setting={setting} />
          <Method2FA
            handleMethodChange={handleMethodChange}
            selectedMethod={selectedMethod}
            isPhoneVerified={isPhoneVerified}
            isGAVerified={isGAVerified}
            handleUpdate={handleUpdate}
          />

          <div className="row mt-5" gutter={[16, 16]}>
            <div className="col-12 col-sm-6">
              <h5>Remembered Computer</h5>
              <div>
                Your remembered computer will only be required to go through two-factor
                authentication once every 30 days.
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <Button onClick={handleForgetThisComputer} className="ml-4 mt-3" type="primary">
                Forget This Computer
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

TwoStepAuthentication.propTypes = {};

export default TwoStepAuthentication;
