import { ProductMutationTemplate } from "components/templates";
import React from "react";
import { Helmet } from "react-helmet";
import { ProductService } from "services";

const AddProductPage = () => {
  return (
    <>
      <Helmet title="Add Product" />
      <ProductMutationTemplate title="Product Creation" />
    </>
  );
};

export default AddProductPage;
