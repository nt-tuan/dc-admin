import qs from "qs";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useLocation } from "react-router-dom";
import { MESSAGES, RouteConst } from "commons/consts";
import { ResetPasswordForm } from "components/organisms/reset-password/reset-password-form/reset-password-form.comp";
import { AuthService } from "services/auth.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { notification } from "antd";
import { Loader } from "components/commons";

const ResetPasswordPage = () => {
  const [isTokenValid, setIsTokenValid] = useState(undefined);
  const [isChecking, setIsChecking] = useState(undefined);
  const history = useHistory();
  const location = useLocation();
  const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    const checkUrlToken = async () => {
      setIsChecking(true);
      await AuthService.verifyResetPasswordToken(token);
    };

    checkUrlToken()
      .then(() => {
        setIsTokenValid(true);
      })
      .catch(() => {
        setIsTokenValid(false);
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [location, token]);

  const onResetPassword = (values) => {
    asyncErrorHandlerWrapper(async () => {
      const parsedValues = {
        newPassword: values.password,
        token: token
      };
      const isOk = await AuthService.resetPassword(parsedValues);
      if (isOk) {
        notification.success({
          message: MESSAGES.RESET_PASSWORD_SUCCESS
        });
        history.push(RouteConst.HOME_ROUTE);
      }
    });
  };

  const renderContent = () => {
    if (isChecking === undefined) return null;
    if (isChecking) return <Loader />;

    if (isTokenValid) {
      return (
        <div className="ml-3 pr-md-5 p-3`">
          <ResetPasswordForm handleSubmit={onResetPassword} />
        </div>
      );
    }

    return (
      <section className="ml-3">
        <h3>Sorry, your link has expired.</h3>
        <span>
          <span>Please request a new one from the </span>
          <Link to={RouteConst.LOGIN_ROUTE}>
            <b>login page</b>
          </Link>
          <span> by clicking “Forgot Password"</span>
        </span>
      </section>
    );
  };

  return (
    <article>
      <Helmet title="Reset Password" />
      {renderContent()}
    </article>
  );
};

export default ResetPasswordPage;
