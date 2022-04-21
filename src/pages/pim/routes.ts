import ProductIcon from "@/components/icons/product.comp";
import { loadable } from "@/utils/loadable.util";
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
    title: "Attributes",
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_ATTRIBUTES,
    Component: loadable(() => import("./attributes")),
    exact: true
  },
  {
    title: "Create Attributes",
    hideInMenu: true,
    icon: ProductIcon,
    path: pimRoutePaths.PRODUCT_ATTRIBUTES_CREATION,
    Component: loadable(() => import("./attributes/creation")),
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