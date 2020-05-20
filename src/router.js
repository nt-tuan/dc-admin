import { ROUTES } from "commons/consts";
import { Loader, MenuDataManager } from "components";
import { ConnectedRouter } from "connected-react-router";
import { Layout } from "layouts/main.layout";
import NotFoundPage from "pages/system/404/404.page";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Switch from "react-router-transition-switch";
import { CSSTransition, SwitchTransition } from "react-transition-group";

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
    path: ROUTES.LOGIN_ROUTE,
    Component: loadable(() => import("pages/login/login.page")),
    exact: true
  }
];

const privateRoutes = [
  {
    path: ROUTES.HOME_ROUTE,
    Component: loadable(() => import("pages/home/home.page")),
    exact: true
  },
  {
    path: ROUTES.USER_MANAGEMENT,
    Component: loadable(() => import("pages/user-management/user-management.page")),
    exact: true
  },
  {
    path: ROUTES.ORDERS,
    Component: loadable(() => import("pages/orders/orders.page")),
    exact: true
  }
];

const routes = [...publicRoutes, ...privateRoutes];
