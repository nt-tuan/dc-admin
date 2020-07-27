import { Loader, MenuDataManager } from "components";
import { ConnectedRouter } from "connected-react-router";
import { Layout } from "layouts/main.layout";
import NotFoundPage from "components/pages/system/404/404.page";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Switch from "react-router-transition-switch";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { RouteConst } from "commons/consts";

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
        <MenuDataManager />
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
    Component: loadable(() => import("components/pages/login/login.page")),
    exact: true
  }
];

const privateRoutes = [
  {
    path: RouteConst.HOME_ROUTE,
    Component: loadable(() => import("components/pages/home/home.page")),
    exact: true
  },
  {
    path: RouteConst.USER_MANAGEMENT,
    Component: loadable(() => import("components/pages/user-management/user-management.page")),
    exact: true
  },
  {
    path: RouteConst.ORDERS,
    Component: loadable(() => import("components/pages/orders/orders.page")),
    exact: true
  },
  {
    path: RouteConst.SERVICE,
    Component: loadable(() => import("components/pages/service/service.page")),
    exact: true
  },
  {
    path: RouteConst.ACCOUNT_SUMMARY,
    Component: loadable(() => import("components/pages/account-summary/account-summary.page")),
    exact: true
  },
  {
    path: RouteConst.WITHDRAW_FUND,
    Component: loadable(() => import("components/pages/withdraw-fund/withdraw-fund.page")),
    exact: true
  },
  {
    path: RouteConst.WALLET,
    Component: loadable(() => import("components/pages/wallet/wallet.page")),
    exact: true
  },
  {
    path: RouteConst.ADD_FUNDS,
    Component: loadable(() => import("components/pages/add-funds/add-funds.page")),
    exact: true
  },
  {
    path: RouteConst.ORDER_TRACK_AND_TRACE,
    Component: loadable(() =>
      import("components/pages/order-track-and-trace/order-track-and-trace.page")
    ),
    exact: true
  },
  {
    path: RouteConst.PRODUCT_DATABASE,
    Component: loadable(() => import("components/pages/product-database/product-database.page")),
    exact: true
  },
  {
    path: RouteConst.ADD_PRODUCT,
    Component: loadable(() => import("components/pages/add-product/add-product.page")),
    exact: true
  },
  {
    path: RouteConst.EDIT_PRODUCT,
    Component: loadable(() => import("components/pages/edit-product/edit-product.page")),
    exact: true
  }
];

const routes = [...publicRoutes, ...privateRoutes];
