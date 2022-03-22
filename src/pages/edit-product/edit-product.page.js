import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { ProductMutationTemplate } from "@/components/product-template-review/product-mutation-template/product-mutation-template.comp";
import { ProductService } from "@/services";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import qs from "qs";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const EditProductPage = () => {
  const location = useLocation();
  const { uid: productId } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const [productDetails, setProductDetails] = useState(undefined);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const productDetails = await ProductService.getProductDetails(productId);
      setProductDetails(productDetails);
    });
  }, [productId]);

  return (
    <>
      <Helmet title="Edit Product" />
      <ProductMutationTemplate productDetails={productDetails} isEditing />
    </>
  );
};

export default EditProductPage;
