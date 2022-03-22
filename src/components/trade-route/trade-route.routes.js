import { RouteConst } from "@/commons/consts";
import { loadable } from "@/utils/loadable.util";

export const tradeRouteRoutes = [
  {
    path: RouteConst.TRADE_ROUTES,
    Component: loadable(() => import("./pages/route.page")),
    exact: true
  },
  {
    path: RouteConst.CREATE_TRADE_ROUTES,
    Component: loadable(() => import("./pages/add-route.page")),
    exact: true
  },
  {
    path: RouteConst.EDIT_TRADE_ROUTE,
    Component: loadable(() => import("./pages/edit-route.page")),
    exact: true
  },
  {
    path: RouteConst.ADD_DEFAULT_ROUTE,
    Component: loadable(() => import("./pages/add-default-route.page")),
    exact: true
  },
  {
    path: RouteConst.EDIT_DEFAULT_ROUTE,
    Component: loadable(() => import("./pages/edit-default-route.page")),
    exact: true
  },
  {
    path: RouteConst.DOCUMENT,
    Component: loadable(() => import("./pages/document.page")),
    exact: true
  }
];
