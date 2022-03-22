import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { ProductMutationTemplate } from "@/components/product-template-review/product-mutation-template/product-mutation-template.comp";
import { ProductService } from "@/services";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import qs from "qs";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const AddProductPage = () => {
  const location = useLocation();
  const { uid: copyProductId } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const [productDetails, setProductDetails] = useState();

  const handleCopiedProduct = (details) => {
    const newName = "Copy of " + details.name;
    details.variants.map((i) =>
      i.name.toLowerCase().includes("productname") ? (i.value = newName) : i
    );
    return {
      ...details,
      name: newName
    };
  };

  useEffect(() => {
    if (copyProductId) {
      asyncErrorHandlerWrapper(async () => {
        const details = await ProductService.getProductDetails(copyProductId);
        setProductDetails(handleCopiedProduct(details));
      });
    }
  }, [copyProductId]);

  return (
    <>
      <Helmet title="Create Product Template" />
      <ProductMutationTemplate
        productDetails={productDetails}
        mutateServiceFn={ProductService.addProduct}
      />
    </>
  );
};

export default AddProductPage;
