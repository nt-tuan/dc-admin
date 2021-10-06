import React from "react";
import { Button, Form, Input } from "antd";
import { passwordSchema } from "utils/schema.util";

export const ResetPasswordForm = ({ handleSubmit }) => {
  const [form] = Form.useForm();

  const { password, confirmPassword } = passwordSchema(form);
  return (
    <div className="mb-5">
      <h3 className="mb-4 mt-1">Reset your password</h3>
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        onFinishFailed={handleSubmit}
        className="mb-4"
      >
        <Form.Item name={password.name} label={password.label} {...password.options}>
          <Input.Password placeholder={password.placeholder} />
        </Form.Item>

        <Form.Item
          name={confirmPassword.name}
          label={confirmPassword.label}
          {...confirmPassword.options}
          className={confirmPassword.className}
        >
          <Input.Password placeholder={confirmPassword.placeholder} />
        </Form.Item>

        <div className="pt-4 d-flex justify-content-start">
          <Button
            type="primary"
            role="button"
            className="ant-btn ant-btn-primary ant-btn-lg text-center font-weight-bold bg-dark-purple"
            htmlType="submit"
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};
