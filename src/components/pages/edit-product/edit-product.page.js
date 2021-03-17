import { ProductMutationTemplate } from "components/templates";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";
import { Helmet } from "react-helmet";

const EditProductPage = () => {
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
