import { Button, Checkbox, Form, Input } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import style from "./styles.module.scss";
import { isScreensize } from "utils/general.util";
import { API_ERRORS } from "commons/consts/system/api-error-code.const";
import { CAPTCHA_NOT_FINISH_ERR, LOGIN_WRONG_OVER_3_TIMES_ERR } from "commons/consts";
import { createFormErrorComp } from "utils";
import { LoginFormContext, LoginFormProvider } from "./login-form-provider.comp";
import { LOGIN_SCHEMA } from "./login-form.schema";
import { LoginFormFooter } from "./login-form-footer.comp";
import { withPlugin } from "plugins/with-plugin";
import { getCompanyName, getMarketplaceEndPoint } from "utils/config.util";
const TermAndPolicy = () => {
  return (
    <div className="mt-2 mb-3">
      <div>
        By Signing up, you agree to {getCompanyName()}’{" "}
        <a
          href={getMarketplaceEndPoint() + "/policies/terms-and-conditions"}
          className="font-weight-bold"
        >
          Terms & Conditions
        </a>{" "}
        &{" "}
        <a
          href={getMarketplaceEndPoint() + "/policies/privacy-policy"}
          className="font-weight-bold"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};
const ErrorMessage = () => {
  const { serverError } = React.useContext(LoginFormContext);
  let Message = createFormErrorComp(serverError);
  if (serverError === LOGIN_WRONG_OVER_3_TIMES_ERR) {
    const _serverError = serverError;
    const splittedArray = _serverError.split("here");
    Message = (
      <React.Fragment>
        {splittedArray[0]}
        <a>here</a>
        {splittedArray[1]}
      </React.Fragment>
    );
  }
  return serverError ? <div className="text-danger mb-3">{Message}</div> : null;
};
const FormHeader = () => {
  return (
    <>
      <div style={{ fontSize: "40px", lineHeight: "47px" }}>Sign in</div>
      <div style={{ fontSize: "20px", lineHeight: "23px" }} className="mb-4 mt-1">
        Please login to your account.
      </div>
    </>
  );
};
const FormContent = () => {
  const { form, isLoading, setServerError } = React.useContext(LoginFormContext);
  const onFieldsChange = () => {
    setServerError();
  };
  const { username, password, rememberMe } = LOGIN_SCHEMA;
  return (
    <Form form={form} layout="vertical" hideRequiredMark className="mb-4">
      {/* Username */}
      <Form.Item
        label={username.label}
        className={username.className}
        name={username.name}
        rules={username.options.rules}
      >
        <Input
          onChange={onFieldsChange}
          size="large"
          placeholder={username.placeholder}
          disabled={isLoading}
        />
      </Form.Item>
      {/* Password */}
      <Form.Item
        label={password.label}
        className={password.className}
        name={password.name}
        rules={password.options.rules}
      >
        <Input.Password
          onChange={onFieldsChange}
          size="large"
          type="password"
          placeholder={password.placeholder}
          disabled={isLoading}
        />
      </Form.Item>
      {/* Sever Error */}
      <ErrorMessage />
      {/* Remember me & forgot password */}
      <div className="d-flex flex-wrap justify-content-between">
        <Form.Item
          name={rememberMe.name}
          valuePropName="checked"
          initialValue={rememberMe.initialValue}
        >
          <Checkbox>{rememberMe.label}</Checkbox>
        </Form.Item>
        {/* <Link to={RouteConst.FORGOT_PASSWORD_ROUTE}>Forgot Username/Password</Link> */}
      </div>
      {/* other things */}
      <TermAndPolicy />
    </Form>
  );
};
const ELoginFormFooter = withPlugin(LoginFormFooter);

export const LoginForm = ({ isLoading, onSubmit }) => {
  const [form] = Form.useForm();
  return (
    <LoginFormProvider form={form} onSubmit={onSubmit} isLoading={isLoading}>
      <div className={style.auth}>
        <div className={`${style.container} pr-md-5 p-3`}>
          <FormHeader />
          <FormContent />
          <ELoginFormFooter />
        </div>
      </div>
    </LoginFormProvider>
  );
};

LoginForm.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool
};

LoginForm.defaultProps = {
  onSubmit: (values) => values,
  isLoading: false
};
