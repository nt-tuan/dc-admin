import React from "react";
import { Input, Button, Form } from "antd";
import { Link } from "react-router-dom";
import { RouteConst } from "commons/consts";
import { FORGOT_PASSWORD_FORM_SCHEMA } from "./forgot-pw-form.schema";

export const ForgotPasswordForm = ({ onSubmit }) => {
  const { email } = FORGOT_PASSWORD_FORM_SCHEMA;

  return (
    <div className="pr-md-5 p-3">
      <h3 className="mt-1">Forgot your password?</h3>
      <p>
        Please enter your username or registered email address. You will receive an email shortly to
        reset your password.
      </p>
      <Form layout="vertical" hideRequiredMark onFinish={onSubmit} className="mb-4">
        <Form.Item
          className={email.className}
          label={email.label}
          name={email.name}
          {...email.options}
        >
          <Input size="large" placeholder={email.placeholder} />
        </Form.Item>
        <div className="pt-4 pb-5 mb-sm-5 d-flex align-items-center">
          <Button
            size="large"
            className="text-center btn btn-primary mr-3 font-weight-bold font-size-18 dtc-min-width-100 bg-dark-purple text-white"
            htmlType="submit"
            role="button"
          >
            Send
          </Button>
          <div className="ml-2">
            <Link to={RouteConst.LOGIN_ROUTE} className="font-weight-bold">
              Back to Login
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};
