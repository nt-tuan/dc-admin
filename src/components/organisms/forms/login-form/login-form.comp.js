import { Button, Checkbox, Form, Input } from "antd";
import { ConstMediator } from "commons/consts";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import style from "./styles.module.scss";
import { UtilMediator } from "utils";

const { isScreensize } = UtilMediator.getgeneralUtils();

const ROUTES = ConstMediator.getAllRoutes();
const ERR_MSG = ConstMediator.getErrorMessages();
const API_ERRORS = ConstMediator.getApiErrors();

export const LoginForm = ({ isLoading, onSubmit }) => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [isCaptchaDone, setIsCaptchaDone] = useState(false);
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const [showServerError, setShowServerError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(undefined);
  const [form] = Form.useForm();
  const recaptchaRef = useRef();

  useEffect(() => {
    if (isScreensize("xs")) {
      setIsSmallDevice(true);
    }
  }, []);

  const handleSubmit = (values) => {
    const onServerError = (errors) => {
      const errorCode = errors[0][1];
      setShowServerError(true);
      setServerError(API_ERRORS[errorCode]);
    };

    if (!isCaptchaDone) {
      setShowCaptchaError(true);
      return;
    }
    const _values = {
      ...values,
      captcha: captchaToken
    };
    onSubmit(_values, { onError: onServerError });

    //reset captcha state
    recaptchaRef.current.reset();
    setCaptchaToken(undefined);
    setIsCaptchaDone(false);
  };

  const onFieldsChange = () => {
    setShowServerError(false);
  };

  const renderCaptcha = () => {
    const onCaptchaDone = (value) => {
      setIsCaptchaDone(true);
      setCaptchaToken(value);
      setShowCaptchaError(false);
      setShowServerError(false);
    };
    return (
      <div>
        <ReCAPTCHA
          size={isSmallDevice ? "compact" : "normal"}
          sitekey={process.env.REACT_APP_RECAPCHA_SITEKEY}
          ref={recaptchaRef}
          onChange={onCaptchaDone}
        />
        {showCaptchaError ? <p className="text-danger">{ERR_MSG.CAPTCHA_NOT_FINISH_ERR}</p> : null}
      </div>
    );
  };

  const renderTermsAndPolicy = () => {
    return (
      <div className="mt-4 mb-3">
        <div>By Signing up, you agree to DistiChain’s </div>
        <div>
          <Link to={ROUTES.TERMS_AND_CONDITIONS_ROUTE} className="font-weight-bold">
            Terms and Conditions
          </Link>{" "}
          &{" "}
          <Link to={ROUTES.PRIVACY_POLICY_ROUTE} className="font-weight-bold">
            Privacy Policy
          </Link>
        </div>
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="font-size-18 pt-4 pb-5 mb-sm-5 d-flex flex-sm-row flex-column justify-content-sm-between align-items-sm-center">
        <Button
          loading={isLoading}
          type="primary"
          size="large"
          className="text-center btn btn-primary font-weight-bold font-size-18 dtc-min-width-100"
          htmlType="submit"
        >
          Log In
        </Button>
        <div className="ml-2">
          <span className="mr-2">Not a Member?</span>
          <Link
            to={ROUTES.REGISTER_ROUTE}
            className="font-weight-bold air__utils__link__underlined"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  };

  const renderServerError = () => {
    let Message = serverError;
    if (serverError === ERR_MSG.LOGIN_WRONG_OVER_3_TIMES_ERR) {
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
    return showServerError ? <div className="text-danger mb-3">{Message}</div> : null;
  };

  const { username, password, rememberMe } = LOGIN_SCHEMA;
  return (
    <div className={style.auth}>
      <div className={`${style.container} pr-md-5 p-3`}>
        <h5 className="mb-4 mt-1">Please login to your account.</h5>
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={handleSubmit}
          className="mb-4"
        >
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
          {renderServerError()}
          {/* Remember me & forgot password */}
          <div className="d-flex flex-wrap justify-content-between">
            <Form.Item
              name={rememberMe.name}
              valuePropName="checked"
              initialValue={rememberMe.initialValue}
            >
              <Checkbox>{rememberMe.label}</Checkbox>
            </Form.Item>
            <Link to={ROUTES.FORGOT_PASSWORD_ROUTE}>Forgot Username/Password</Link>
          </div>
          {/* other things */}
          {renderTermsAndPolicy()}
          {renderCaptcha()}
          {renderButtons()}
        </Form>
      </div>
    </div>
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

const LOGIN_SCHEMA = {
  username: {
    name: "username",
    label: "Username",
    placeholder: "Username",
    className: "pb-1 mb-2",
    options: {
      rules: [{ required: true, message: ERR_MSG.REQUIRED_ERR("Username") }]
    }
  },
  password: {
    name: "password",
    label: "Password",
    placeholder: "Password",
    className: "pb-1 mb-2",
    options: {
      rules: [{ required: true, message: ERR_MSG.REQUIRED_ERR("Password") }]
    }
  },
  rememberMe: {
    name: "rememberMe",
    label: "Remember Me",
    initialValue: false,
    className: "col-12",
    options: {}
  }
};
