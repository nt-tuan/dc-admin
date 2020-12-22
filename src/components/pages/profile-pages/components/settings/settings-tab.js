import React from "react";
//** Components */
import NotificationPreference from "./notifacation-preference";
import LoginSetting from "./login";
import TwoStepAuthentication from "./2StepAuth";
import PassCode from "./passcode";

function SettingTab() {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="d-flex align-items-center mt-2 mb-3">
          <h3 className="text-dark mb-0 mr-2 ">Settings</h3>
          <hr />
        </div>
        <NotificationPreference />
        <hr />
        <LoginSetting />
        <hr />
        <TwoStepAuthentication />
        <hr />
        <PassCode />
      </div>
    </div>
  );
}

SettingTab.propTypes = {};

export default SettingTab;
