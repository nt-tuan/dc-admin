import React from "react";
import { Radio, Modal, Button, Popconfirm } from "antd";
import { MESSAGES } from "commons/consts";
import { USER_TABS_NAME } from "commons/consts";
import { useBooleanState } from "hooks/utilHooks";
import GoogleAuthenticator from "../../modals/GoogleAuthenticator";
import PropTypes from "prop-types";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};
function Method2FA({
  handleMethodChange,
  selectedMethod,
  isPhoneVerified,
  isGAVerified,
  handleUpdate
}) {
  const [showGoogleAuthenticator, toogleGoogleAuthenticator] = useBooleanState(false);
  const onConfirmVerifyPhone = () => {
    history.push({
      pathname: `/profile/${USER_TABS_NAME.profileInfo}`,
      state: { isVerified: true }
    });
  };

  return (
    <div className="row mt-5" gutter={[16, 16]}>
      <div className="col-12 col-sm-6">
        <h5>Two-Factor Authentication (2FA) Methods</h5>
        <div>
          You can select your preferred method to receive the two-factor authentication code.
        </div>
      </div>
      <div className="col-12 col-sm-6">
        <Radio.Group onChange={handleMethodChange} value={selectedMethod}>
          <Radio style={radioStyle} value="EMAIL">
            Email
          </Radio>
          <div className="d-flex align-items-center">
            <Radio style={radioStyle} value="SMS" disabled={isPhoneVerified === false}>
              SMS
            </Radio>
            <Popconfirm
              title={MESSAGES.VERIFY_PHONE_TO_USE_THIS_FEATURE}
              onConfirm={onConfirmVerifyPhone}
              okText="Yes"
              cancelText="No"
            >
              <i className="fe fe-info" hidden={isPhoneVerified} />
            </Popconfirm>
          </div>

          <div className="d-flex align-items-center">
            <Radio style={radioStyle} value="GA" disabled={isGAVerified === false}>
              Google Authenticator
            </Radio>
            {showGoogleAuthenticator && (
              <GoogleAuthenticator
                isGAVerified={showGoogleAuthenticator}
                toogleGoogleAuthenticator={() =>
                  toogleGoogleAuthenticator(!showGoogleAuthenticator)
                }
              />
            )}
          </div>
        </Radio.Group>
        <i
          className="fe fe-info"
          hidden={isGAVerified}
          onClick={() => toogleGoogleAuthenticator(!toogleGoogleAuthenticator)}
        />
        <div>
          <Button onClick={handleUpdate} className="ml-4 mt-3" type="primary">
            Update 2FA Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

Method2FA.propTypes = {
  handleMethodChange: PropTypes.func,
  selectedMethod: PropTypes.func,
  isPhoneVerified: PropTypes.bool,
  handleUpdate: PropTypes.func
};
Method2FA.defaultProps = {
  handleMethodChange: () => {},
  selectedMethod: () => {},
  isPhoneVerified: () => {},
  handleUpdate: () => {}
};

export default Method2FA;
