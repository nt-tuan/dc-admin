import { generatePath } from "react-router-dom";

export const pimRoutePaths = {
  PRODUCT_CLASSFICATION: "/admin/product-classification",
  PRODUCT_CLASSFICATION_WIZARD: "/admin/product-classification/wizard",
  PRODUCT_CLASSFICATION_CREATION: "/admin/product-classification/creation",
  PRODUCT_BRICK: "/admin/product/brick",
  PRODUCT_BRICK_CREATION: "/admin/product/brick/creation",
  PRODUCT_BRICK_EDITION: "/admin/product/brick/edition/:code",
  PRODUCT_ATTRIBUTE_CREATION: "/admin/product/attribute/creation/:code",
  PRODUCT_ATTRIBUTE_EDITION: "/admin/product/attribute/edition/:code"
};

export const getBrickCreationPath = (code: string) => {
  return generatePath(pimRoutePaths.PRODUCT_BRICK_CREATION, { code });
};

export const getBrickEditionPath = (code: string) => {
  return generatePath(pimRoutePaths.PRODUCT_BRICK_EDITION, { code });
};

export const getAttributeCreationPath = (code: string) => {
  return generatePath(pimRoutePaths.PRODUCT_ATTRIBUTE_CREATION, { code });
};

export const getAttributeEditionPath = (code: string) => {
  return generatePath(pimRoutePaths.PRODUCT_ATTRIBUTE_EDITION, { code });
};
