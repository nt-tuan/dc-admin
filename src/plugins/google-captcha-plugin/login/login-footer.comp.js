import React from "react";
import { Button } from "antd";
import { LoginFormContext } from "components/organisms/login/login-form/login-form-provider.comp";
import { GoogleCaptcha } from "../google-captcha.comp";
export const createLoginFormFooterWithCaptcha = (recapchaSiteKey) => () => {
  const { isLoading, onSubmit, getSubmitValues } = React.useContext(LoginFormContext);
  const [captchaToken, setCaptchaToken] = React.useState();
  const [captchaError, setCaptchaError] = React.useState(false);
  const captchaRef = React.useRef();
  const resetCaptcha = () => {
    if (captchaRef.current == null) return;
    captchaRef.current.reset();
    setCaptchaToken();
    setCaptchaError();
  };
  const handleSubmit = async () => {
    const { error, values, onError } = await getSubmitValues();
    if (error != null) return;
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }
    onSubmit(values, { onError });
    resetCaptcha();
  };
  const handleCaptchaDone = (value) => {
    setCaptchaToken(value);
  };
  return (
    <div className="d-flex justify-content-between">
      {recapchaSiteKey && (
        <GoogleCaptcha
          ref={captchaRef}
          onChange={handleCaptchaDone}
          captchaError={captchaError}
          recapchaSiteKey={recapchaSiteKey}
        />
      )}
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        type="primary"
        size="large"
        className="text-center font-weight-bold font-size-18 dtc-min-width-100 btn-auth"
        htmlType="submit"
      >
        Log In
      </Button>
    </div>
  );
};
