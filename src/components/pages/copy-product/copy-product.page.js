import { ProductMutationTemplate } from "components/templates";
import React, { useEffect, useState } from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";
import { Helmet } from "react-helmet";
import qs from "qs";

const CopyProductPage = () => {
  const { uid: productId } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const [productDetails, setProductDetails] = useState(undefined);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const details = await ProductService.getProductDetails(productId);
      setProductDetails({ ...details, name: "Copy of " + details.name });
    });
  }, [productId]);

  return (
    <>
      <Helmet title="Add Product" />
      <ProductMutationTemplate productDetails={productDetails} />
    </>
  );
};

export default CopyProductPage;
