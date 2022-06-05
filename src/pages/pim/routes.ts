import ProductIcon from "@/components/icons/product.comp";
import { loadable } from "@/utils/loadable.util";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
export const pimRoutes = [
  {
    title: "Product Classification",
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_CLASSFICATION,
    Component: loadable(() => import("./product-classification/list.page")),
    exact: true
  },
  {
    title: "Create Product Classification",
    hideInMenu: true,
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_CLASSFICATION_CREATION,
    Component: loadable(() => import("./product-classification/creation.page")),
    exact: true
  },
  {
    title: "Brick",
    path: pimRoutePaths.PRODUCT_BRICK,
    Component: loadable(() => import("./brick/list.page")),
    exact: true
  },
  {
    title: "Create Brick",
    hideInMenu: true,
    path: pimRoutePaths.PRODUCT_BRICK_CREATION,
    Component: loadable(() => import("./brick/creation.page")),
    exact: true
  },
  {
    title: "Edit Brick",
    hideInMenu: true,
    path: pimRoutePaths.PRODUCT_BRICK_EDITION,
    Component: loadable(() => import("./brick/edition.page")),
    exact: true
  },
  {
    title: "Attributes",
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_ATTRIBUTES,
    Component: loadable(() => import("./attributes/list.page")),
    exact: true
  },
  {
    title: "Create Attributes",
    hideInMenu: true,
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_ATTRIBUTE_CREATION,
    Component: loadable(() => import("./attributes/creation.page")),
    exact: true
  },
  {
    title: "Input Registration",
    hideInMenu: true,
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_ATTRIBUTE_EDITION,
    Component: loadable(() => import("./attributes/edition.page"))
  }
];

export const pimMenu = {
  title: "Product",
  key: "product",
  icon: ProductIcon,
  children: [
    ...pimRoutes
      .filter((item) => !item.hideInMenu)
      .map(({ title, path }) => ({
        title,
        url: path,
        key: path
      }))
  ]
};
