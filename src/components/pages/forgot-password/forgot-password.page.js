import React from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ForgotPasswordForm } from "components/organisms/forgot-password";
import { AuthService } from "services/auth.service";
import { RouteConst } from "commons/consts";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

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
