import * as USER_DUCK from "@/redux/user/user.duck";

import { API_ERRORS, MessageConst, RouteConst } from "@/commons/consts";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LoginForm } from "./login-form/login-form.comp";
import React from "react";
import { useMessage } from "@/hooks/use-message";
import { checkTfaLogin } from "@/components/auth/services/auth.service";
import { selectBrowserFingerprint } from "@/redux/settings/settings.duck";
import { useTFAVaildator } from "@/components/auth/controllers/use-tfa-validator";
import { TFAModal } from "@/components/auth/components/tfa-modal";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";

const LoginPage = () => {
  const message = useMessage();
  const formRef = React.useRef();
  const history = useHistory();
  const asyncErrorHandler = useAsyncErrorHandler();
  const onError = React.useCallback((errors) => {
    const errorCode = errors[0][1];
    const serverError = API_ERRORS[errorCode];
    formRef.current.setFieldError("password", serverError);
  }, []);
  const onSuccess = React.useCallback(() => {
    history.push(RouteConst.HOME_ROUTE);
    message.success(MessageConst.LOGIN_SUCCESS_MSG);
  }, [history, message]);
  const handleTfalogin = async () => {
    const values = formRef.current.values;
    dispatch({ type: USER_DUCK.LOGIN, payload: { values, onError, onSuccess } });
  };

  const {
    startVerify,
    isVerifying,
    cancel,
    verify,
    method,
    isSubmitting,
    config,
    setConfig
  } = useTFAVaildator(
    {
      onError,
      requestVerifyFn: async () => {},
      validateFn: handleTfalogin
    },
    {
      ga: { isSetup: false },
      sms: { enablePhoneConfirm: false }
    }
  );

  const browserId = useSelector(selectBrowserFingerprint);
  const user = useSelector(USER_DUCK.selectCurrentUser);
  const isAuthorized = user.authorized;

  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.user?.loading);
  const handleSubmit = async (values) => {
    asyncErrorHandler(async () => {
      const { username, password } = values;
      const { is_locked, tfa_check, tfa_config } = await checkTfaLogin({
        username,
        password,
        browserId
      });
      if (is_locked) {
        message.error("Your account has been locked!");
        return;
      }
      if (tfa_check) {
        const tfaType = tfa_config.defaultMethod;
        setConfig({
          ga: {
            isSetup: false
          },
          sms: {
            phone: tfa_config.phoneHidden,
            enablePhoneConfirm: false
          },
          email: {
            email: tfa_config.emailHidden,
            loadEmailFromProfile: false
          }
        });
        startVerify(tfaType);
        return;
      }
      dispatch({ type: USER_DUCK.LOGIN, payload: { values, onError, onSuccess } });
    });
  };

  if (!loading && isAuthorized) return <Redirect to={RouteConst.HOME_ROUTE} />;
  return (
    <>
      <LoginForm ref={formRef} onSubmit={handleSubmit} isLoading={loading} />
      <TFAModal
        open={isVerifying}
        method={method}
        onCancel={cancel}
        onVerify={verify}
        isSubmitting={isSubmitting}
        config={config}
      />
    </>
  );
};
export default LoginPage;
