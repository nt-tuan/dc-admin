import { Button, Form } from "antd";
import { ProductMutationTemplate } from "components/templates";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { ProductService } from "services";
import { VitalInformationForm } from "./vital-infor-form/vital-infor-form.comp";

const AddProductPage = () => {
  return (
    <>
      <Helmet title="Add Product" />
      <ProductMutationTemplate
        title="Product Creation"
        pageName="AddProductPage"
        mutateServiceFn={ProductService.addProduct}
      />
    </>
  );
};

export default AddProductPage;
