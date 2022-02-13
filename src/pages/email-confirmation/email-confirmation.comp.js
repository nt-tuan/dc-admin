import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { AuthService } from "services/auth.service";
import { Helmet } from "react-helmet";
import { Loader } from "components/commons";
import { RouteConst } from "commons/consts";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getCompanyShortName } from "utils/config.util";
import qs from "qs";

const Content = ({ isChecking, isTokenValid }) => {
  if (isChecking) return <Loader />;
  if (isTokenValid)
    return (
      <div className="ml-3 pr-md-5 p-3`">
        <h4>
          <span>Your email has been Verified. Please </span>
          <Link to={RouteConst.LOGIN_ROUTE}>
            <b>Login</b>
          </Link>
          <span> to your {getCompanyShortName()} Dashboard</span>
        </h4>
      </div>
    );
  return (
    <section className="ml-3">
      <h3>Sorry, your link has expired.</h3>
    </section>
  );
};

const EmailConfirmationPage = () => {
  const [isTokenValid, setIsTokenValid] = useState(undefined);
  const [isChecking, setIsChecking] = useState(false);
  const location = useLocation();
  const { userId, token } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      setIsChecking(true);
      setIsTokenValid(token ? await AuthService.verifyConfirmEmailToken({ userId, token }) : false);
      setIsChecking(false);
    });
  }, [location, token, userId]);

  return (
    <article>
      <Helmet title="Email Verified" />
      <Content isChecking={isChecking} isTokenValid={isTokenValid} />
    </article>
  );
};

export default React.memo(EmailConfirmationPage);
