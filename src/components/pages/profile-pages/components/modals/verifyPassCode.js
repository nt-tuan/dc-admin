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

function VerifyPassCode({
  setShowModalVerifyPassCode,
  isShowModalVerifyPassCode,
  setIsShowForm,
  setIsShowView
}) {
  const [form] = Form.useForm();
  const [requiredPositions, setRequiredPositions] = useState(getPositionList());
  const history = useHistory();

  const handleError = (text) => {
    message.error(text);
  };

  const handle3StepsProcessResponse = (res, successFn, handleError, errStr = "Server error") => {
    switch (res.status) {
      case THREE_STEPS_SECURITY_STATUS.SUCCESS:
        successFn();
        break;
      case THREE_STEPS_SECURITY_STATUS.INVALID:
        handleError(PASSCODE_INVALID);
        break;
      case THREE_STEPS_SECURITY_STATUS.OTP_LOCKED:
        handleError(
          `Your account will be locked ${moment
            .utc(res.updatedDate)
            .add(1, "h")
            .fromNow()} due to wrong OTP code 3 times`
        );
        break;
      case THREE_STEPS_SECURITY_STATUS.OTP_EXPIRED:
        handleError("OTP expired");
        break;
      case THREE_STEPS_SECURITY_STATUS.PASSCODE_LOCKED:
        handleError(
          `Your account will be locked ${moment
            .utc(res.updatedDate)
            .add(1, "d")
            .fromNow()} due to wrong passcode 3 times`
        );
        break;
      default:
        handleError(errStr);
        break;
    }
  };

  //** Handle Submit Passcode */
  const onFinish = (values) => {
    const listKey = Object.keys(values);

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
          const res = await validatePasscode(data);
          const successFn = () => {
            setShowModalVerifyPassCode(false);
            setIsShowForm(true);
            setIsShowView(false);
            message.success("Verify successful");
          };
          handle3StepsProcessResponse(res, successFn, handleError, "Incorrect code");
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
      visible={isShowModalVerifyPassCode}
      title="Enter your verification code"
      footer={false}
      onCancel={() => setShowModalVerifyPassCode(false)}
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
VerifyPassCode.propTypes = {
  setShowModalVerifyPassCode: PropTypes.func,
  isShowModalVerifyPassCode: PropTypes.bool,
  setIsShowForm: PropTypes.func
};
VerifyPassCode.defaultProps = {
  isShowModalVerifyPassCode: false,
  setIsShowForm: () => {}
};

export default VerifyPassCode;
