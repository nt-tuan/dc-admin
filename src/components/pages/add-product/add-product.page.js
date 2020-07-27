import { ProductMutationTemplate } from "components/templates";
import React from "react";
import { ProductService } from "services";

const AddProductPage = () => {
  return (
    <ProductMutationTemplate
      title="Product Creation"
      pageName="AddProductPage"
      mutateServiceFn={ProductService.addProduct}
    />
  );
};

export default AddProductPage;
