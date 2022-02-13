import React, { Fragment, useEffect } from "react";
import { Redirect, useLocation, useRouteMatch } from "react-router-dom";

import { AuthLayout } from "./auth/auth-layout.comp";
import { Helmet } from "react-helmet";
import { Loader } from "components/commons";
import NProgress from "nprogress";
import { PublicLayout } from "./public/public.layout";
import { RouteConst } from "commons/consts";
import { getCompanyName } from "utils/config.util";
import { selectCurrentUser } from "redux/user/user.duck";
import { useSelector } from "react-redux";

const Layouts = {
  public: PublicLayout,
  private: AuthLayout,
  noLayout: null
};

export const Layout = React.memo(({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === RouteConst.LOGIN_ROUTE;
  const user = useSelector(selectCurrentUser);
  const { pathname } = location;
  const isPrivateRoute = useRouteMatch({
    path: RouteConst.PRIVATE_ROUTES,
    exact: true
  });

  useEffect(() => {
    // NProgress Management
    NProgress.start();

    setTimeout(() => {
      NProgress.done();
    }, 300);
  }, [location]);

  const getLayout = () => {
    if (isPrivateRoute !== null) {
      return "private";
    }
    return "public";
  };

  const BootstrappedLayout = () => {
    const Container = Layouts[getLayout(pathname)];
    const isUserAuthorized = user.authorized;
    const isUserLoading = user.loading;
    const isAdminUser = user.companyType === "PCC";
    const isPrivateLayout = getLayout() === "private";
    const isErrorPage = getLayout() === "error";
    const isNotFoundPage = getLayout() === "notfound";

    // show loader when user in check authorization process, not authorized yet and not on login pages
    if (isUserLoading && isUserAuthorized === false && isPrivateLayout) {
      return <Loader />;
    }

    // Error page or page not found
    if (isErrorPage || isNotFoundPage) {
      return children;
    }

    if (isUserAuthorized === false && isPrivateLayout) {
      return <Redirect to={RouteConst.LOGIN_ROUTE} />;
    }

    if (!isPrivateLayout && !isLogin) {
      return Container ? <Container>{children}</Container> : children;
    }

    if (isUserAuthorized && isAdminUser && isPrivateLayout === false) {
      return <Redirect to={RouteConst.HOME_ROUTE} />;
    }

    if (isPrivateLayout && !isAdminUser) {
      return <Redirect to={RouteConst.LOGIN_ROUTE} />;
    }

    // in other case render previously set layout
    return Container ? <Container>{children}</Container> : children;
  };

  return (
    <Fragment>
      <Helmet titleTemplate={`${getCompanyName()} - %s`} />
      {BootstrappedLayout()}
    </Fragment>
  );
});
