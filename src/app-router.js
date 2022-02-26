import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AuthLayout } from "./layouts/auth/auth-layout.comp";
import { ConnectedRouter } from "connected-react-router";
import { Helmet } from "react-helmet";
import { Loader } from "components/commons";
import { MainAuthLayout } from "./layouts/auth/main-layout.comp";
import { PreferencesLayout } from "@/layouts/auth/preference-layout.comp";
import PreferencesBrandingPage from "@/pages/preferences/preferences-branding.page";
import { useSelector } from "react-redux";
import { selectBrandingAssetsData } from "@/redux/configs/configs.duck";
import { PublicLayout } from "./layouts/public/public.layout";
import { RouteConst } from "commons/consts";
import { SettingsLayout } from "./layouts/auth/settings-layout.comp";
import { getAssetURL } from "utils/config.util";

const getChildrenPaths = (route) => {
  if (route.children == null || route.children.length === 0) return [route.path];
  const paths = [];
  for (const child of route.children) {
    paths.push(...getChildrenPaths(child));
  }
  return paths;
};

const AppRouter = ({ history }) => {
  const brandingAssets = useSelector(selectBrandingAssetsData);
  const renderRoutes = (routes) => {
    return (
      <Suspense fallback={<Loader />}>
        <Switch>
          {routes.map((route) => {
            if (route.children == null || route.children.length === 0) {
              return <Route key={route.path} path={route.path} component={route.Component} exact />;
            }
            const Layout = route.Component;
            const childrenPaths = getChildrenPaths(route);
            return (
              <Route key={route.key} path={childrenPaths} exact>
                <Layout>{renderRoutes(route.children)}</Layout>
              </Route>
            );
          })}
        </Switch>
      </Suspense>
    );
  };

  return (
    <ConnectedRouter history={history}>
      <Helmet>
        <link rel="shortcut icon" href={getAssetURL("/favicon.png")} />
        <link rel="icon" type="image/x-icon" href={brandingAssets.favicon} />
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
      {renderRoutes(routeData)}
    </ConnectedRouter>
  );
};
export default AppRouter;

const loadable = (loader) =>
  React.lazy(() =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    ).then(loader)
  );

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

const routeData = [
  {
    key: "auth-layout",
    Component: AuthLayout,
    children: [
      {
        key: "settings-layout",
        Component: SettingsLayout,
        children: [
          {
            path: RouteConst.ORGANIZATION_PROFILE,
            Component: loadable(() =>
              import("pages/organization-profile/organization-profile.page")
            )
          },
          {
            key: "preference-layout",
            Component: PreferencesLayout,
            children: [
              // {
              //   path: RouteConst.PREFERENCES_GENERAL_PAGES,
              //   Component: PreferencesGeneralPage
              // },
              {
                path: RouteConst.PREFERENCES_BRANDING_PAGES,
                Component: PreferencesBrandingPage
              }
            ]
          }
        ]
      },
      {
        key: "main-auth-layout",
        Component: MainAuthLayout,
        children: [
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
            Component: loadable(() =>
              import("pages/admin-user-management/admin-user-management.page")
            ),
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
        ]
      }
    ]
  },
  {
    key: "public-layout",
    Component: PublicLayout,
    children: publicRoutes
  }
];
