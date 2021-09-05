import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Checkbox, Popconfirm, Button, notification } from "antd";
import { NOTIFICATION_CHANNELS, MESSAGES, RouteConst } from "commons/consts";
import { selectUsers } from "redux/user/user.duck";
import { USER_TABS_NAME } from "commons/consts";
import { updateNotificationChannel } from "services/user-profile.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import * as USER_DUCK from "redux/user/user.duck";

function NotificationPreference() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const history = useHistory();
  const { phoneVerified, bySms, byWeb, byEmail, byWhatsapp } = users;

  const onFinish = (values) => {
    const fieldName = "notificationChannel";
    const parsedValues = {
      byEmail: values[fieldName].includes(NOTIFICATION_CHANNELS.EMAIL),
      byWeb: values[fieldName].includes(NOTIFICATION_CHANNELS.WEB),
      byWhatsapp: phoneVerified
        ? values[fieldName].includes(NOTIFICATION_CHANNELS.WHATSAPP)
        : false,
      bySms: values[fieldName].includes(NOTIFICATION_CHANNELS.SMS)
    };
    if (parsedValues) {
      asyncErrorHandlerWrapper(async () => {
        await updateNotificationChannel(parsedValues);
        notification.success({
          message: MESSAGES.UPDATE_SUCCESSFUL
        });
        dispatch({ type: USER_DUCK.LOAD_CURRENT_ACCOUNT });
      });
    }
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  const onConfirmPhone = () => {
    history.push({
      pathname: `${RouteConst.PROFILE}/${USER_TABS_NAME.profileInfo}`,
      state: { isVerified: true }
    });
  };

  //** Render WhatApps checkbox */
  const renderWhatsAppCheckbox = () => {
    return phoneVerified ? (
      <Checkbox name="byWhatsapp" value={NOTIFICATION_CHANNELS.WHATSAPP} className="mr-2">
        WhatsApp
      </Checkbox>
    ) : (
      <div className="d-flex align-items-center mr-2">
        <Checkbox name="byWhatsapp" disabled value={NOTIFICATION_CHANNELS.WHATSAPP}>
          Whatsapp
        </Checkbox>
        <Popconfirm
          title={MESSAGES.VERIFY_PHONE_TO_USE_THIS_FEATURE}
          onConfirm={onConfirmPhone}
          okText="Yes"
          cancelText="No"
        >
          <i className="fe fe-info" />
        </Popconfirm>
      </div>
    );
  };

  //** Render SMS Checkbox */
  const renderSmsCheckbox = () => {
    return phoneVerified ? (
      <Checkbox name="bySms" value={NOTIFICATION_CHANNELS.SMS} className="mr-2">
        SMS
      </Checkbox>
    ) : (
      <div className="d-flex align-items-center mr-2">
        <Checkbox disabled name="bySms" value={NOTIFICATION_CHANNELS.SMS}>
          SMS
        </Checkbox>
        <Popconfirm
          title={MESSAGES.VERIFY_PHONE_TO_USE_THIS_FEATURE}
          onConfirm={onConfirmPhone}
          okText="Yes"
          cancelText="No"
        >
          <i className="fe fe-info" />
        </Popconfirm>
      </div>
    );
  };
  return (
    <div>
      <h5>Notification Preference</h5>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          ["notificationChannel"]: [
            byWeb ? NOTIFICATION_CHANNELS.WEB : null,
            byEmail ? NOTIFICATION_CHANNELS.EMAIL : null,
            bySms ? NOTIFICATION_CHANNELS.SMS : null,
            byWhatsapp && phoneVerified ? NOTIFICATION_CHANNELS.WHATSAPP : null
          ]
        }}
      >
        <Form.Item name="notificationChannel">
          <Checkbox.Group className="w-100 d-flex flex-sm-row flex-column">
            {renderWhatsAppCheckbox()}
            {renderSmsCheckbox()}
            <Checkbox name="byWeb" value={NOTIFICATION_CHANNELS.WEB} className="m-0">
              Website
            </Checkbox>
            <Checkbox name="byEmail" value={NOTIFICATION_CHANNELS.EMAIL} className="m-0">
              Email
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <div className="pt-4 d-flex justify-content-end">
          <Button
            type="primary"
            size="large"
            className="text-center btn btn-primary font-weight-bold font-size-18 dtc-min-width-100"
            htmlType="submit"
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

NotificationPreference.propTypes = {};

export default NotificationPreference;
