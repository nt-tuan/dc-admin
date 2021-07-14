import { RouteConst } from "commons/consts";
import { Loader } from "components";
import NProgress from "nprogress";
import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Redirect, useLocation, useRouteMatch } from "react-router-dom";
import { selectCurrentUser } from "redux/user/user.duck";
import { getCompanyName } from "utils/config.util";
import AuthLayout from "./auth/auth.layout";
import { PublicLayout } from "./public/public.layout";

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
      return <Redirect to="/login" />;
    }

    if (!isPrivateLayout && !isLogin) {
      return Container ? <Container>{children}</Container> : children;
    }

    if (isUserAuthorized && isPrivateLayout === false) {
      return <Redirect to="/" />;
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
