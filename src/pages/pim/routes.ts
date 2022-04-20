import { loadable } from "@/utils/loadable.util";
import ProductIcon from "@/components/icons/product.comp";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
export const pimRoutes = [
  {
    title: "Product Classification",
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_CLASSFICATION,
    Component: loadable(() => import("./product-classification")),
    exact: true
  },
  {
    title: "Create Product Classification",
    hideInMenu: true,
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_CLASSFICATION_CREATION,
    Component: loadable(() => import("./product-classification/creation")),
    exact: true
  },
  {
    title: "Product Classification Wizard",
    hideInMenu: true,
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_CLASSFICATION_WIZARD,
    Component: loadable(() => import("./product-classification/wizard")),
    exact: true
  },
  {
    title: "Brick",
    path: pimRoutePaths.PRODUCT_BRICK,
    Component: loadable(() => import("./brick")),
    exact: true
  },
  {
    title: "Create Brick",
    hideInMenu: true,
    path: pimRoutePaths.PRODUCT_BRICK_CREATION,
    Component: loadable(() => import("./brick/creation")),
    exact: true
  },
  {
    title: "Edit Brick",
    hideInMenu: true,
    path: pimRoutePaths.PRODUCT_BRICK_EDITION,
    Component: loadable(() => import("./brick/edition")),
    exact: true
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
