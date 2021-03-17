import React from "react";
import { APIError } from "commons/types";
import { Form, Button, message, Input } from "antd";
import { createFormErrorComp } from "utils";
import { PASSWORD_SCHEMA } from "commons/schemas";
import { PW_2_PASSWORD_NOT_THE_SAME_ERR } from "commons/consts";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { AuthService } from "services/auth.service";
import { MESSAGES, API_ERRORS } from "commons/consts";
import PropTypes from "prop-types";
import { isObject } from "lodash";

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
    },
    password: {
      name: "password",
      label: "New Password",
      placeholder: "New Password",
      className: "pb-1 mb-2",
      options: {
        rules: [
          { required: true, message: PASSWORD_SCHEMA.required.errMsg },
          {
            min: PASSWORD_SCHEMA.minMax.min,
            max: PASSWORD_SCHEMA.minMax.max,
            message: PASSWORD_SCHEMA.minMax.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Lower.regex,
            message: PASSWORD_SCHEMA.atLeast1Lower.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Number.regex,
            message: PASSWORD_SCHEMA.atLeast1Number.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Special.regex,
            message: PASSWORD_SCHEMA.atLeast1Special.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Upper.regex,
            message: PASSWORD_SCHEMA.atLeast1Upper.errMsg
          },
          {
            validator: PASSWORD_SCHEMA.CurrentPWandNewPW(form, "currentPassword", "password")
              .newPassword
          }
        ]
      }
    },
    confirmPassword: {
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "New Confirm Password",
      className: "pb-1 mb-2",
      options: {
        rules: [
          { required: true, message: PASSWORD_SCHEMA.required.errMsg },
          { validator: PASSWORD_SCHEMA.showErrorLabel },
          {
            min: PASSWORD_SCHEMA.minMax.min,
            max: PASSWORD_SCHEMA.minMax.max,
            message: PASSWORD_SCHEMA.minMax.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Lower.regex,
            message: PASSWORD_SCHEMA.atLeast1Lower.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Number.regex,
            message: PASSWORD_SCHEMA.atLeast1Number.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Special.regex,
            message: PASSWORD_SCHEMA.atLeast1Special.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Upper.regex,
            message: PASSWORD_SCHEMA.atLeast1Upper.errMsg
          },
          {
            validator: PASSWORD_SCHEMA.PWandConfirmPW(
              form,
              "password",
              "confirmPassword"
            ).confirmPassword(PW_2_PASSWORD_NOT_THE_SAME_ERR)
          }
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
