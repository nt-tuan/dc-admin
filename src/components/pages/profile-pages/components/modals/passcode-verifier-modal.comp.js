import React, { useState } from "react";
import { Modal, Button, Form, message } from "antd";
import PassCodeItemForm from "../settings/passcode/passcode-item-form";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { validatePasscode } from "services/user-profile.service";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { USER_TABS_NAME, THREE_STEPS_SECURITY_STATUS, PASSCODE_INVALID } from "commons/consts";
import moment from "moment";

//** Random array positions */
const getPositionList = () => {
  let positionList = [];
  while (positionList.length < 3) {
    let position = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    if (!positionList.includes(position)) positionList.push(position);
  }
  positionList.sort();
  return positionList;
};

const handleError = (response) => {
  switch (response.status) {
    case THREE_STEPS_SECURITY_STATUS.INVALID:
      message.error(PASSCODE_INVALID);
      break;
    case THREE_STEPS_SECURITY_STATUS.OTP_LOCKED:
      message.error(
        `Your account will be locked ${moment
          .utc(response.updatedDate)
          .add(1, "h")
          .fromNow()} due to wrong OTP code 3 times`
      );
      break;
    case THREE_STEPS_SECURITY_STATUS.OTP_EXPIRED:
      message.error("OTP expired");
      break;
    case THREE_STEPS_SECURITY_STATUS.PASSCODE_LOCKED:
      message.error(
        `Your account will be locked ${moment
          .utc(response.updatedDate)
          .add(1, "d")
          .fromNow()} due to wrong passcode 3 times`
      );
      break;
    default:
      message.error("Server error");
      break;
  }
};
export function PasscodeVerifierModal({ visible, onCancel, onVerified }) {
  const [form] = Form.useForm();
  const requiredPositions = React.useMemo(getPositionList, []);
  const history = useHistory();

  const handle3StepsProcessResponse = (response) => {
    if (response.status === THREE_STEPS_SECURITY_STATUS.SUCCESS) {
      message.success("Verify successful");
      onVerified();
      return;
    }
    handleError(response);
  };

  //** Handle Submit Passcode */
  const onFinish = (values) => {
    const array = requiredPositions.map((position) => ({
      position,
      value: values[`passCode-${position + 1}`].toString()
    }));
    if (array.length > 0) {
      const data = {
        characterPasscodeList: array
      };
      asyncErrorHandlerWrapper(async () => {
        try {
          const response = await validatePasscode(data);
          handle3StepsProcessResponse(response);
        } catch (error) {
          if (error.message === "400") {
            message.error(PASSCODE_INVALID);
            return;
          }
          throw error;
        }
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Enter your verification code"
      footer={false}
      onCancel={onCancel}
    >
      <div>
        <p>
          Please enter the characters {requiredPositions.map((item) => item + 1).join(", ")} from
          your passcode
        </p>
        <Form form={form} onFinish={onFinish}>
          <PassCodeItemForm
            name="passCode"
            isVerifyPasscode
            requiredPositions={requiredPositions}
          />
          <a
            className="text-primary"
            onClick={() => history.push(`/profile/${USER_TABS_NAME.settings}`)}
          >
            Forgot passcode?
          </a>
          <Form.Item style={{ marginTop: "30px" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

PasscodeVerifierModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onVerified: PropTypes.func.isRequired
};
