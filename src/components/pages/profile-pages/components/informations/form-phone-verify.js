import React, { memo } from "react";
import { Button, Tooltip, Input, Form } from "antd";
import { WRONG_VERIFICATION_CODE } from "commons/consts";
import PropTypes from "prop-types";

const FormPhoneVerify = memo(({ onShowVerifyPhone, setIsSendCode }) => {
  const [form] = Form.useForm();

  //** Handle Verify Code */
  const handleVerifyCode = (values) => {
    if (values?.code !== null) {
      const onServerError = () => {
        form.setFields([{ name: "code", errors: [WRONG_VERIFICATION_CODE] }]);
      };
      onShowVerifyPhone(values?.code.trim(), { onError: onServerError });
    }
  };

  return (
    <Form name="customized_form_controls" layout="inline" onFinish={handleVerifyCode} form={form}>
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
