import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { RouteConst } from "commons/consts";

const ForgotPasswordSuccessPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  return (
    <article className="ml-3 mr-5">
      <Helmet title="Forgot Password Success" />
      <p>
        We've sent a link to <b>{email}</b> to help you reset your password
      </p>
      <p>
        <Link
          to={RouteConst.LOGIN_ROUTE}
          className="ant-btn ant-btn-primary bg-dark-purple text-white"
        >
          <span>Return to Login</span>
        </Link>
      </p>
    </article>
  );
};

export default ForgotPasswordSuccessPage;
