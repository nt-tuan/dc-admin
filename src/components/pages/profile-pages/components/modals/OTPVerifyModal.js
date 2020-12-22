import React, { useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { selectUsers } from "redux/user/user.duck";
import { createFormErrorComp } from "utils";
import { REQUIRED_ERR, THREE_STEPS_SECURITY_STATUS } from "commons/consts";
import { createOTP, validateOTP } from "services/user-profile.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

OTPVerifyModal.propTypes = {};

function OTPVerifyModal({ isOTPRequest, setIsOTPRequest, setShowModalVerifyPassCode }) {
  const users = useSelector(selectUsers);
  const [form] = Form.useForm();

  //** Handle Finish  */
  const onFinish = (values) => {
    asyncErrorHandlerWrapper(async () => {
      const res = await validateOTP({ code: values.otp });
      if (res && res.status === THREE_STEPS_SECURITY_STATUS.SUCCESS) {
        message.success("Verify successful");
        setIsOTPRequest(false);
        setShowModalVerifyPassCode(true);
      } else {
        form.setFields([
          {
            name: "otp",
            errors: ["Incorrect code"]
          }
        ]);
      }
    });
  };

  const sendOPT = () => {
    asyncErrorHandlerWrapper(async () => {
      await createOTP();
      message.info(`New OTP code was send to ${users.phone}`);
    });
  };

  useEffect(() => {
    sendOPT();
  }, [sendOPT]);

  const onResendVerificationCode = () => {
    sendOPT();
  };

  return (
    <Modal
      visible={isOTPRequest}
      title="Enter your verification code"
      footer={false}
      onCancel={() => setIsOTPRequest(false)}
    >
      <p>
        Input the code we sent to <b>{users.phone}</b> to access your account.
      </p>
      <div>
        <Form form={form} onFinish={onFinish}>
          <div className="d-flex align-items-start mt-2 mb-3">
            <Form.Item name="otp" rules={[{ required: true, message: "Incorrect code" }]}>
              <Input placeholder="Enter your code" />
            </Form.Item>
            <Button type="link" onClick={onResendVerificationCode}>
              Resend
            </Button>
          </div>

          <Form.Item style={{ marginTop: "20px" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default OTPVerifyModal;
