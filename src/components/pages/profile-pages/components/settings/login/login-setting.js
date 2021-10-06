import React from "react";
import { APIError } from "commons/types";
import { Form, Button, message, Input } from "antd";
import { createFormErrorComp } from "utils";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { AuthService } from "services/auth.service";
import { MESSAGES, API_ERRORS } from "commons/consts";
import { isObject } from "lodash";
import { passwordSchema } from "utils/schema.util";

LoginSetting.propTypes = {};

function LoginSetting() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        const params = {
          currentPassword: values.currentPassword,
          newPassword: values.password
        };
        const res = await AuthService.changePassword(params);
        if (res) {
          message.success({
            content: MESSAGES.CHANGE_PASSWORD_SUCCESS
          });
        }
        form.resetFields();
      } catch (errors) {
        if (errors instanceof APIError) {
          if (isObject(errors.errors)) {
            const errorFields = errors.errors.map((error) => {
              const errorField = error[0];
              const errorCode = error[1];
              // message.error({
              //   content: API_ERRORS[errorCode]
              // });
              return {
                name: errorField,
                errors: [API_ERRORS[errorCode]]
              };
            });
            form.setFields(errorFields);
          }
          return;
        }
        throw errors;
      }
    });
  };

  const RESET_PW_SCHEMA = {
    ...passwordSchema(form),
    currentPassword: {
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Current Password",
      className: "pb-1 mb-2",
      options: {
        rules: [
          { required: true, message: createFormErrorComp("Please input your Current Password") }
        ]
      }
    }
  };

  return (
    <div>
      <h5>Login Settings</h5>
      <Form layout="vertical" onFinish={onFinish} className="mb-4" form={form}>
        <Form.Item
          name={RESET_PW_SCHEMA.currentPassword.name}
          label={RESET_PW_SCHEMA.currentPassword.label}
          rules={RESET_PW_SCHEMA.currentPassword.options.rules}
        >
          <Input.Password placeholder={RESET_PW_SCHEMA.currentPassword.placeholder} />
        </Form.Item>
        <Form.Item
          name={RESET_PW_SCHEMA.password.name}
          rules={RESET_PW_SCHEMA.password.options.rules}
          label={RESET_PW_SCHEMA.password.label}
        >
          <Input.Password placeholder={RESET_PW_SCHEMA.password.placeholder} />
        </Form.Item>
        <Form.Item
          name={RESET_PW_SCHEMA.confirmPassword.name}
          label={RESET_PW_SCHEMA.confirmPassword.label}
          rules={RESET_PW_SCHEMA.confirmPassword.options.rules}
        >
          <Input.Password placeholder={RESET_PW_SCHEMA.confirmPassword.placeholder} />
        </Form.Item>
        <div className={`pt-4 d-flex justify-content-end`}>
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

export default LoginSetting;
