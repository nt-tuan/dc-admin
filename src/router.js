import { ROUTES } from "commons/consts";
import { Loader } from "components";
import { MenuDataManager } from "components/layout";
import { ConnectedRouter } from "connected-react-router";
import { Layout } from "layouts/main.layout";
import NotFoundPage from "pages/system/404/404.page";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
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
              <Route
                exact
                path={ROUTES.HOME_ROUTE}
                render={() => <Redirect to={ROUTES.SELLER_DASHBOARD_ROUTE} />}
              />

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
  // public
  {
    path: ROUTES.LOGIN_ROUTE,
    Component: loadable(() => import("pages/home/home.page")),
    exact: true
  }
];

const routes = [...publicRoutes];
