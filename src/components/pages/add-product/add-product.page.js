import { ProductMutationTemplate } from "components/templates";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ProductService } from "services";
import qs from "qs";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const AddProductPage = () => {
  const { uid: productId } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const [productDetails, setProductDetails] = useState(undefined);

  const handleCopiedProduct = (details) => {
    const newName = "Copy of " + details.name;
    details.variants.map((i) => (i.value === details.name ? (i.value = newName) : i));
    return {
      ...details,
      name: newName
    };
  };

  useEffect(() => {
    // duplicating product
    if (productId) {
      asyncErrorHandlerWrapper(async () => {
        const details = await ProductService.getProductDetails(productId);
        setProductDetails(handleCopiedProduct(details));
      });
    }
  }, [productId]);

  return (
    <>
      <Helmet title="Add Product" />
      <ProductMutationTemplate
        productDetails={productDetails}
        mutateServiceFn={ProductService.addProduct}
      />
    </>
  );
};

export default AddProductPage;
