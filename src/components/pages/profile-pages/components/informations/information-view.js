import React, { memo, useState } from "react";
import { Popconfirm, Tooltip, message } from "antd";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
//** components */
import countryList from "assets/country.json";
import { MESSAGES } from "commons/consts";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { verifyPhoneCode } from "services/user-profile.service";
import * as USER_ACTIONS from "redux/user/user.duck";
import FormPhoneVerify from "./form-phone-verify";

const InformationView = memo((props) => {
  const {
    users: { username, middleName, firstName, lastName, email, country, phone, phoneVerified },
    handleSendRequest
  } = props;
  const countryValue = countryList.find((it) => it.alpha2Code === country)?.name;
  const dispatch = useDispatch();
  const [isSendCode, setIsSendCode] = useState(false);

  //** Handle Send Code */
  const handleSendCode = () => {
    handleSendRequest();
    setIsSendCode(true);
  };

  //** Handle verify form */
  const onShowVerifyPhone = (code, { onError }) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        const res = await verifyPhoneCode(code);
        setIsSendCode(false);
        dispatch({ type: USER_ACTIONS.LOAD_CURRENT_ACCOUNT, payload: false });
        if (res) {
          message.success({
            content: "Verify successful"
          });
        }
      } catch (error) {
        onError(error);
      }
    });
  };

  return (
    <div className="col-lg-12 col-md-12 col-sm-12">
      <p className="row">
        <b className="text-left col-md-3">User name:</b>
        <span className="text-left col-md-9">{username}</span>
      </p>
      <p className="row">
        <b className="text-left col-md-3">First Name:</b>
        <span className="text-left col-md-9">{firstName}</span>
      </p>
      <p className="row">
        <b className="text-left col-md-3">Middle Name:</b>
        <span className="text-left col-md-9">{middleName}</span>
      </p>
      <p className="row">
        <b className="text-left col-md-3">Last Name:</b>
        <span className="text-left col-md-9">{lastName}</span>
      </p>
      <p className="row">
        <b className="text-left col-md-3">Email:</b>
        <span className="text-left col-md-9">{email}</span>
      </p>
      <p className="row">
        <b className="text-left col-md-3">Country:</b>
        <span className="text-left col-md-9">{countryValue}</span>
      </p>
      <p className="row align-items-center">
        <b className="text-left col-md-3">Phone Number:</b>
        <span className="text-left col-md-9">
          {phone}
          {phoneVerified ? (
            <Tooltip title="Verified">
              <i className="ml-2 text-success fe fe-check" />
            </Tooltip>
          ) : (
            <Popconfirm
              title={MESSAGES.VERIFY_PHONE_NOW}
              okText="Yes"
              onConfirm={!isSendCode ? handleSendCode : null}
              cancelText="No"
            >
              <i className="ml-2 text-danger fe fe-alert-circle" />
            </Popconfirm>
          )}
        </span>
      </p>
      <div className="row">
        <b className="text-left col-md-3">&nbsp;</b>
        <span className="text-left col-md-9">
          {isSendCode && (
            <FormPhoneVerify setIsSendCode={setIsSendCode} onShowVerifyPhone={onShowVerifyPhone} />
          )}
        </span>
      </div>
    </div>
  );
});

InformationView.propTypes = {
  username: PropTypes.string
};

InformationView.defaultProps = {
  username: null // define title
};

export default InformationView;
