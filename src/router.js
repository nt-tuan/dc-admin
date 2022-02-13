import { CSSTransition, SwitchTransition } from "react-transition-group";
import React, { Suspense } from "react";

import { ConnectedRouter } from "connected-react-router";
import { Helmet } from "react-helmet";
import { Layout } from "layouts/main.layout";
import { Loader } from "components/commons";
import NotFoundPage from "pages/system/404/404.page";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom";
import { RouteConst } from "commons/consts";
import Switch from "react-router-transition-switch";
import { connect } from "react-redux";
import { getAssetURL } from "utils/config.util";

const mapStateToProps = ({ settings }) => ({ settings });

@connect(mapStateToProps)
class Router extends React.Component {
  render() {
    const {
      history,
      settings: { routerAnimation }
    } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Helmet>
          <link rel="shortcut icon" href={getAssetURL("/favicon.png")} />
          <link rel="icon" type="image/x-icon" href={getAssetURL("/favicon/favicon.ico")} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={getAssetURL("/favicon/apple-touch-icon.png")}
          />
          <link
            rel="mask-icon"
            href={getAssetURL("/favicon/safari-pinned-tab.svg")}
            color="#5bbad5"
          />
          <meta name="msapplication-config" content={getAssetURL("/browserconfig.xml")} />
        </Helmet>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Switch
              render={(props) => {
                const {
                  children,
                  location: { pathname }
                } = props;
                return (
                  <SwitchTransition>
                    <CSSTransition
                      key={pathname}
                      classNames={routerAnimation}
                      timeout={routerAnimation === "none" ? 0 : 300}
                    >
                      {children}
                    </CSSTransition>
                  </SwitchTransition>
                );
              }}
            >
              {routes.map(({ path, Component, exact }) => {
                return (
                  <Route path={path} key={path} exact={exact}>
                    <Component />
                  </Route>
                );
              })}
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </Layout>
      </ConnectedRouter>
    );
  }
}

export default Router;

const loadable = (loader) => React.lazy(loader);

const publicRoutes = [
  {
    path: RouteConst.LOGIN_ROUTE,
    Component: loadable(() => import("pages/login/login.page")),
    exact: true
  },
  {
    path: RouteConst.EMAIL_VERIFICATION,
    Component: loadable(() => import("pages/email-confirmation/email-confirmation.comp")),
    exact: true
  },
  {
    path: RouteConst.FORGOT_PASSWORD_ROUTE,
    Component: loadable(() => import("pages/forgot-password/forgot-password.page")),
    exact: true
  },
  {
    path: RouteConst.FORGOT_PASSWORD_SUCCESS_ROUTE,
    Component: loadable(() => import("pages/forgot-password-success/forgot-password-success.page")),
    exact: true
  }
];

const privateRoutes = [
  {
    path: RouteConst.HOME_ROUTE,
    Component: () => <Redirect to={RouteConst.ORDERS} />,
    exact: true
  },
  {
    path: RouteConst.USER_MANAGEMENT,
    Component: loadable(() => import("pages/user-management/user-management.page")),
    exact: true
  },
  {
    path: RouteConst.ORDERS,
    Component: loadable(() => import("pages/orders/orders.page")),
    exact: true
  },
  {
    path: RouteConst.ACCOUNT_SUMMARY,
    Component: loadable(() => import("pages/account-summary/account-summary.page")),
    exact: true
  },
  {
    path: RouteConst.WITHDRAW_FUND,
    Component: loadable(() => import("pages/withdraw-fund/withdraw-fund.page")),
    exact: true
  },
  {
    path: RouteConst.WALLET,
    Component: loadable(() => import("pages/wallet/wallet.page")),
    exact: true
  },
  {
    path: RouteConst.FEATURE_TOGGLES,
    Component: loadable(() => import("pages/feature-toggles/feature-toggles.page")),
    exact: true
  },
  {
    path: RouteConst.ADD_FUNDS,
    Component: loadable(() => import("pages/add-funds/add-funds.page")),
    exact: true
  },
  {
    path: RouteConst.PRODUCT_DATABASE,
    Component: loadable(() => import("pages/product-database/product-database.page")),
    exact: true
  },
  {
    path: RouteConst.ADD_PRODUCT,
    Component: loadable(() => import("pages/add-product/add-product.page")),
    exact: false
  },
  {
    path: RouteConst.EDIT_PRODUCT,
    Component: loadable(() => import("pages/edit-product/edit-product.page")),
    exact: false
  },
  {
    path: RouteConst.TRADE_ROUTES,
    Component: loadable(() => import("pages/route/route.page")),
    exact: true
  },
  {
    path: RouteConst.CREATE_TRADE_ROUTES,
    Component: loadable(() => import("pages/add-route/add-route.page")),
    exact: true
  },
  {
    path: RouteConst.EDIT_TRADE_ROUTE,
    Component: loadable(() => import("pages/edit-route/edit-route.page")),
    exact: true
  },
  {
    path: RouteConst.ADD_DEFAULT_ROUTE,
    Component: loadable(() => import("pages/add-default-route/add-default-route.page")),
    exact: true
  },
  {
    path: RouteConst.EDIT_DEFAULT_ROUTE,
    Component: loadable(() => import("pages/edit-default-route/edit-default-route.page")),
    exact: true
  },
  {
    path: RouteConst.DOCUMENT,
    Component: loadable(() => import("pages/document/document.page")),
    exact: true
  },
  {
    path: RouteConst.USER_DETAILS,
    Component: loadable(() => import("pages/user-details/user-details.page")),
    exact: true
  },
  {
    path: RouteConst.NOTIFICATION,
    Component: loadable(() => import("pages/notification/notification.page")),
    exact: true
  },
  {
    path: RouteConst.ADMIN_USER_MANAGEMENT,
    Component: loadable(() => import("pages/admin-user-management/admin-user-management.page")),
    exact: true
  },
  {
    path: RouteConst.ADD_ADMIN_USER,
    Component: loadable(() => import("pages/add-admin-user/add-admin-user.page")),
    exact: true
  },
  {
    path: RouteConst.PROFILE_PAGES,
    Component: loadable(() => import("pages/profile-pages/profile-page"))
  }
];

const routes = [...publicRoutes, ...privateRoutes];
