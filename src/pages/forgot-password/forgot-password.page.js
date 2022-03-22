import { AuthService } from "@/services/auth.service";
import { ForgotPasswordForm } from "./forgot-password-form/forgot-pw-form.comp";
import { Helmet } from "react-helmet";
import React from "react";
import { RouteConst } from "@/commons/consts";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { useHistory } from "react-router-dom";

const ForgotPasswordPage = () => {
  const history = useHistory();
  const onSubmit = (values) => {
    asyncErrorHandlerWrapper(async () => {
      await AuthService.sendResetPwEmail(values.email);
      history.push({
        pathname: RouteConst.FORGOT_PASSWORD_SUCCESS_ROUTE,
        state: { email: values.email }
      });
    });
  };
  return (
    <article>
      <Helmet title="Forgot Password" />
      <ForgotPasswordForm onSubmit={onSubmit} />
    </article>
  );
};

export default ForgotPasswordPage;
