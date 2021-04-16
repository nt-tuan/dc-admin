import React, { useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { selectUsers } from "redux/user/user.duck";
import { THREE_STEPS_SECURITY_STATUS } from "commons/consts";
import { createOTP, validateOTP } from "services/user-profile.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import PropTypes from "prop-types";

export const PhoneVerifierModal = ({ visible, onCancel, onVerified }) => {
  const users = useSelector(selectUsers);
  const [form] = Form.useForm();

  //** Handle Finish  */
  const onFinish = (values) => {
    asyncErrorHandlerWrapper(async () => {
      const res = await validateOTP({ code: values.otp });
      if (res && res.status === THREE_STEPS_SECURITY_STATUS.SUCCESS) {
        message.success("Verify successful");
        onVerified();
      } else {
        if (res.status === THREE_STEPS_SECURITY_STATUS.OTP_LOCKED) {
          form.setFields([
            {
              name: "otp",
              errors: ["OTP is locked"]
            }
          ]);
          return;
        }
        if (res.status === THREE_STEPS_SECURITY_STATUS.OTP_EXPIRED) {
          form.setFields([
            {
              name: "otp",
              errors: ["OTP is expired"]
            }
          ]);
          return;
        }
        form.setFields([
          {
            name: "otp",
            errors: ["Incorrect code"]
          }
        ]);
      }
    });
  };

  const sendOPT = React.useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      await createOTP();
      message.info(`New OTP code was send to ${users.phone}`);
    });
  }, [users.phone]);

  useEffect(() => {
    if (visible) {
      sendOPT();
    }
  }, [sendOPT, visible]);

  const onResendVerificationCode = () => {
    sendOPT();
  };

  return (
    <Modal
      visible={visible}
      title="Enter your verification code"
      footer={false}
      onCancel={onCancel}
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
};

PhoneVerifierModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onVerified: PropTypes.func.isRequired
};
