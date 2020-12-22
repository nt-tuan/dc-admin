import React from "react";
import { Button, Form, Input } from "antd";
import PropTypes from "prop-types";

const GOOGLE_AUTHENTICATOR_VERIFICATION_SCHEMA = {
  code: {
    name: "code",
    label: "code",
    placeholder: "Please enter your code",
    className: "mb-0 mr-2",
    options: {
      rules: [{ required: true, message: "Code is required" }]
    }
  }
};

const GoogleAuthenticatorVerificationForm = ({ handleBackButton, handleVerifyGACode }) => {
  const { code } = GOOGLE_AUTHENTICATOR_VERIFICATION_SCHEMA;
  const [form] = Form.useForm();
  const onFinish = (values) => {
    handleVerifyGACode(values.code);
  };
  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name={code.name} rules={code.options.rules} className={code.className}>
          <Input placeholder={code.placeholder} />
        </Form.Item>

        <div className="d-flex justify-content-center mt-4">
          <Button type="primary" htmlType="button" className="mr-2" onClick={handleBackButton}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

GoogleAuthenticatorVerificationForm.propTypes = {
  handleVerifyGACode: PropTypes.func,
  handleBackButton: PropTypes.func,
  form: PropTypes.object
};

export default GoogleAuthenticatorVerificationForm;
