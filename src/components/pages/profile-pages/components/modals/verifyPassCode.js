import React, { useState } from "react";
import { Modal, Button, Form, message } from "antd";
import PassCodeItemForm from "../settings/passcode/passcode-item-form";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { validatePasscode } from "services/user-profile.service";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { USER_TABS_NAME } from "commons/consts";

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
          setShowModalVerifyPassCode(false);
          setIsShowForm(true);
          setIsShowView(false);
          message.success("Verify successful");
        } catch (error) {
          message.error("Incorrect passcode");
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
