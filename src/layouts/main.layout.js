import { ConstFacade } from "commons/consts/const.facade";
import { Loader } from "components";
import { modifyVars } from "less";
import NProgress from "nprogress";
import React, { Fragment, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Redirect, useLocation, useRouteMatch } from "react-router-dom";
import { selectCurrentUser } from "redux/user/user.duck";
import AuthLayout from "./auth/auth.layout";
import { PublicLayout } from "./public/public.layout";

const privateRoutes = ConstFacade.getPrivateRoutes();

const Layouts = {
  public: PublicLayout,
  private: AuthLayout,
  noLayout: null
};

export const Layout = React.memo(({ children }) => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const lastPathRole = useRef(undefined);
  const { pathname } = location;
  const isPrivateRoute = useRouteMatch({
    path: privateRoutes,
    exact: true
  });

  useEffect(() => {
    // NProgress Management
    NProgress.start();

    setTimeout(() => {
      NProgress.done();
    }, 300);
  }, [location]);

  useEffect(() => {
    const { pathname } = location;
    const isBuyer = pathname.includes("buyer");
    if (lastPathRole.current === undefined || lastPathRole.current !== isBuyer) {
      lastPathRole.current = isBuyer;
      document.getElementsByTagName("body")[0].className = isBuyer ? "buyer" : "seller";
      modifyVars(isBuyer ? buyerThemeParams : sellerThemeParams);
    }
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

    if (isUserAuthorized && isPrivateLayout === false) {
      return <Redirect to="/" />;
    }

    // in other case render previously set layout
    return Container ? <Container>{children}</Container> : children;
  };

  return (
    <Fragment>
      <Helmet titleTemplate="Distichain - %s" />
      {BootstrappedLayout()}
    </Fragment>
  );
});

const sellerThemeParams = {
  "@primary-color": "#005691",
  "@info-color": "#0887c9",
  "@success-color": "#46be8a",
  "@error-color": "#fb434a",
  "@highlight-color": "#fb434a",
  "@warning-color": "#f39834",
  "@normal-color": "#e4e9f0",
  "@input-hover-border-color": "#005691",
  "@input-border-color": "#005691"
};

const buyerThemeParams = {
  "@primary-color": "#4D824B",
  "@info-color": "#047CD8",
  "@success-color": "#2DB541",
  "@error-color": "#DB3052",
  "@highlight-color": "#DB3052",
  "@warning-color": "#BCCC0C",
  "@normal-color": "#e4e9f0",
  "@input-hover-border-color": "#4D824B",
  "@input-border-color": "#4D824B"
};
