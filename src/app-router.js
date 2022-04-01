import { PreferencesLayout } from "@/layouts/auth/preference-layout.comp";
import { selectBrandingAssetsData } from "@/redux/configs/configs.duck";
import Box from "@mui/material/Box";
import { RouteConst } from "@/commons/consts";
import { Loader } from "@/components/commons";
import { ConnectedRouter } from "connected-react-router";
import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { getAssetURL } from "@/utils/config.util";
import { bankRoutes } from "./components/bank-details/bank.routes";

import { tradeRouteRoutes } from "./components/trade-route/trade-route.routes";
import { userProfileRoutes } from "./components/user-profile/user-profile.routes";
import { AuthLayout } from "./layouts/auth/auth-layout.comp";
import { MainContainer } from "./layouts/auth/main-container.comp";
import { MainAuthLayout } from "./layouts/auth/main-layout.comp";
import { SettingsLayout } from "./layouts/auth/settings-layout.comp";
import { PublicLayout } from "./layouts/public/public.layout";
import { loadable } from "./utils/loadable.util";

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
      <Suspense
        fallback={
          <Box height={200}>
            <Loader />
          </Box>
        }
      >
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

const publicRoutes = [
  {
    path: RouteConst.LOGIN_ROUTE,
    Component: loadable(() => import("@/pages/login/login.page")),
    exact: true
  },
  {
    path: RouteConst.EMAIL_VERIFICATION,
    Component: loadable(() => import("@/pages/email-confirmation/email-confirmation.comp")),
    exact: true
  },
  {
    path: RouteConst.FORGOT_PASSWORD_ROUTE,
    Component: loadable(() => import("@/pages/forgot-password/forgot-password.page")),
    exact: true
  },
  {
    path: RouteConst.FORGOT_PASSWORD_SUCCESS_ROUTE,
    Component: loadable(() =>
      import("@/pages/forgot-password-success/forgot-password-success.page")
    ),
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
              import("@/pages/organization-profile/organization-profile.page")
            )
          },
          {
            key: "preference-layout",
            Component: PreferencesLayout,
            children: [
              {
                path: RouteConst.PREFERENCES_GENERAL_PAGES,
                Component: loadable(() => import("@/pages/preferences/preferences-general.page"))
              },
              {
                path: RouteConst.PREFERENCES_BRANDING_PAGES,
                Component: loadable(() => import("@/pages/preferences/preferences-branding.page"))
              }
            ]
          },
          {
            path: RouteConst.ADMIN_USER_MANAGEMENT,
            Component: loadable(() =>
              import("@/pages/admin-user-management/admin-user-management.page")
            ),
            exact: true
          },
          {
            path: RouteConst.ADD_ADMIN_USER,
            Component: loadable(() => import("@/pages/add-admin-user/add-admin-user.page")),
            exact: true
          },
          {
            path: RouteConst.EDIT_ADMIN_USER,
            Component: loadable(() => import("@/pages/edit-admin-user/edit-admin-user.page")),
            exact: true
          },
          ...bankRoutes
        ]
      },
      {
        key: "main-auth-layout",
        Component: MainAuthLayout,
        children: [
          {
            key: "main-auth-container",
            Component: MainContainer,
            children: [
              {
                path: RouteConst.HOME_ROUTE,
                Component: () => <Redirect to={RouteConst.ORDERS} />,
                exact: true
              },
              {
                path: RouteConst.USER_MANAGEMENT,
                Component: loadable(() => import("@/pages/user-management/user-management.page")),
                exact: true
              },
              {
                path: RouteConst.ORDERS,
                Component: loadable(() => import("@/pages/orders/orders.page")),
                exact: true
              },
              {
                path: RouteConst.ACCOUNT_SUMMARY,
                Component: loadable(() => import("@/pages/account-summary/account-summary.page")),
                exact: true
              },
              {
                path: RouteConst.WITHDRAW_FUND,
                Component: loadable(() => import("@/pages/withdraw-fund/new-withdraw-fund.page")),
                exact: true
              },
              {
                path: RouteConst.WALLET,
                Component: loadable(() => import("@/pages/wallet/wallet.page")),
                exact: true
              },
              {
                path: RouteConst.FEATURE_TOGGLES,
                Component: loadable(() => import("@/pages/feature-toggles/feature-toggles.page")),
                exact: true
              },
              {
                path: RouteConst.ADD_FUNDS,
                Component: loadable(() => import("@/pages/add-funds/add-funds.page")),
                exact: true
              },
              {
                path: RouteConst.PRODUCT_DATABASE,
                Component: loadable(() => import("@/pages/product-database/product-database.page")),
                exact: true
              },
              {
                path: RouteConst.ADD_PRODUCT,
                Component: loadable(() => import("@/pages/add-product/add-product.page")),
                exact: false
              },
              {
                path: RouteConst.EDIT_PRODUCT,
                Component: loadable(() => import("@/pages/edit-product/edit-product.page")),
                exact: false
              },
              {
                path: RouteConst.USER_DETAILS,
                Component: loadable(() => import("@/pages/user-details/user-details.page")),
                exact: true
              },
              {
                path: RouteConst.NOTIFICATION,
                Component: loadable(() => import("@/pages/notification/notification.page")),
                exact: true
              },
              ...tradeRouteRoutes
            ]
          },
          ...userProfileRoutes
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
