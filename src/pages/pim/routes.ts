import { loadable } from "@/utils/loadable.util";
import ProductIcon from "@/components/icons/product.comp";
export const pimRoutes = [
  {
    title: "Product Classification",
    icon: ProductIcon,
    path: "/admin/product-classification",
    Component: loadable(() => import("./product-classification")),
    exact: true
  },
  {
    title: "Product Classification",
    hideInMenu: true,
    icon: ProductIcon,
    path: "/admin/product-classification/creation",
    Component: loadable(() => import("./product-classification/creation")),
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
