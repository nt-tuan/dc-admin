import { ProductMutationTemplate } from "components/templates";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ProductService } from "services";
import qs from "qs";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const AddProductPage = () => {
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
      <Helmet title="Add Product" />
      <ProductMutationTemplate
        productDetails={productDetails}
        mutateServiceFn={ProductService.addProduct}
      />
    </>
  );
};

export default AddProductPage;
