import React from "react";
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from "react-google-recaptcha";
import { createFormErrorComp } from "@/utils";
import { CAPTCHA_NOT_FINISH_ERR } from "@/commons/consts";
import { useScreenSize } from "@/hooks/use-screen-size";
export const GoogleCaptcha = React.forwardRef(
  ({ onChange, captchaError, recapchaSiteKey }, ref) => {
    const { isScreenSize } = useScreenSize();
    const reCaptchaSize = React.useMemo(() => (isScreenSize("sm") ? "compact" : "normal"), [
      isScreenSize
    ]);
    return (
      <div>
        <ReCAPTCHA
          key={reCaptchaSize}
          size={reCaptchaSize}
          sitekey={recapchaSiteKey}
          ref={ref}
          onChange={onChange}
        />
        {captchaError ? (
          <p className="text-danger">{createFormErrorComp(CAPTCHA_NOT_FINISH_ERR)}</p>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
