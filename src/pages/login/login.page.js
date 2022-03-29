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
import { checkValidationCode } from "@/services";

const LoginPage = () => {
  const message = useMessage();
  const formRef = React.useRef();
  const history = useHistory();
  const asyncErrorHandler = useAsyncErrorHandler();
  const onError = React.useCallback(
    (errors) => {
      if (typeof errors?.message === "string") {
        message.error(errors.message);
        return;
      }
      const errorCode = errors[0][1];
      const serverError = API_ERRORS[errorCode];
      formRef.current.setFieldError("password", serverError);
    },
    [message]
  );
  const onSuccess = React.useCallback(() => {
    history.push(RouteConst.HOME_ROUTE);
    message.success(MessageConst.LOGIN_SUCCESS_MSG);
  }, [history, message]);
  const browserId = useSelector(selectBrowserFingerprint);
  const [tfaData, setTfaData] = React.useState();
  const handleTfalogin = () => {
    const values = formRef.current.values;
    dispatch({
      type: USER_DUCK.LOGIN,
      payload: { values, onError, onSuccess }
    });
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
      onSuccess: () => {
        handleTfalogin();
      },
      requestVerifyFn: async () => {},
      validateFn: (code) =>
        checkValidationCode({
          code,
          browserId,
          username: formRef.current.values.username,
          type: tfaData?.tfaType
        }).then(({ matcher }) => {
          if (!matcher) {
            throw new Error("Wrong verification code");
          }
        })
    },
    {
      ga: { isSetup: false },
      sms: { enablePhoneConfirm: false }
    }
  );

  const user = useSelector(USER_DUCK.selectCurrentUser);
  const isAuthorized = user.authorized;

  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.user?.loading);
  const handleSubmit = async (values) => {
    asyncErrorHandler(async () => {
      try {
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
          setTfaData({
            tfaType
          });
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
      } catch (error) {
        onError(error?.errors);
      }
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
