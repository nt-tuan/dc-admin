import { AuthService } from "@/services/auth.service";
import { ForgotPasswordForm } from "./forgot-password-form/forgot-pw-form.comp";
import { Helmet } from "react-helmet";
import React from "react";
import { RouteConst } from "@/commons/consts";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { useErrorHandler } from "../../utils/error-handler.util";

const ForgotPasswordPage = () => {
  const handleError = useErrorHandler();
  const history = useHistory();
  const ref = React.useRef();
  const { mutate, isLoading, isError } = useMutation(AuthService.sendResetPwEmail, {
    onSuccess: () => {
      history.push({
        pathname: RouteConst.FORGOT_PASSWORD_SUCCESS_ROUTE,
        state: { email: ref.current.values?.email }
      });
    },
    onError: (error) => {
      if (error?.errMsg?.error_message) {
        ref.current.setFieldError("email", error?.errMsg?.error_message);
        return;
      }
      handleError.onError(error);
    }
  });
  const onSubmit = (values) => {
    mutate(values.email);
  };

  return (
    <article>
      <Helmet title="Forgot Password" />
      <ForgotPasswordForm ref={ref} onSubmit={onSubmit} isLoading={isLoading && !isError} />
    </article>
  );
};

export default ForgotPasswordPage;
