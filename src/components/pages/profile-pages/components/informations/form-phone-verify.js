import React, { memo } from "react";
import { Button, Tooltip, Input, Form, Alert } from "antd";
import { MESSAGES, WRONG_VERIFICATION_CODE } from "commons/consts";
import PropTypes from "prop-types";

const FormPhoneVerify = memo(({ onShowVerifyPhone, setIsSendCode }) => {
  //** Handle Verify Code */
  const handleVerifyCode = (values) => {
    onShowVerifyPhone(values?.code);
  };

  return (
    <Form name="customized_form_controls" layout="inline" onFinish={handleVerifyCode}>
      <Form.Item
        name="code"
        label="Verify Code"
        rules={[{ required: true, message: WRONG_VERIFICATION_CODE }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Tooltip>
          <Button type="primary" htmlType="submit" className="mr-2">
            <i className="fe fe-check" />
          </Button>
        </Tooltip>
        <Button type="primary" htmlType="button" onClick={() => setIsSendCode(false)}>
          <i className="fe fe-x" />
        </Button>
      </Form.Item>
      <Form.Item style={{ marginTop: "20px" }}>
        <Alert message={MESSAGES.PHONE_VERIFICATION_CODE_SENT} type="error" closable />
      </Form.Item>
    </Form>
  );
});

FormPhoneVerify.propTypes = {
  handleShowFormVerify: PropTypes.func
};

FormPhoneVerify.defaultProps = {
  handleShowFormVerify: () => {}
};

export default FormPhoneVerify;
