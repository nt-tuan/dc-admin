import { Layout } from "./components/layout";
import { RoutePathEnum } from "./constants/route-paths.const";
import { loadable } from "@/utils/loadable.util";

export const userProfileRoutes = [
  {
    key: "settings-layout",
    Component: Layout,
    children: [
      {
        key: RoutePathEnum.PERSIONAL_INFORMATION,
        path: RoutePathEnum.PERSIONAL_INFORMATION,
        Component: loadable(() => import("./pages/personal-information.page"))
      },
      {
        key: RoutePathEnum.SECURITY,
        path: RoutePathEnum.SECURITY,
        Component: loadable(() => import("./pages/security.page"))
      },
      {
        key: RoutePathEnum.TWO_FACTOR_AUTHENTICATION,
        path: RoutePathEnum.TWO_FACTOR_AUTHENTICATION,
        Component: loadable(() => import("./pages/two-factor-authentication.page"))
      },
      {
        key: RoutePathEnum.NOTIFICATIONS,
        path: RoutePathEnum.NOTIFICATIONS,
        Component: loadable(() => import("./pages/notifications.page"))
      }
    ]
  }
];
