import { ProductMutationTemplate } from "components/templates";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";
import { Helmet } from "react-helmet";
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
