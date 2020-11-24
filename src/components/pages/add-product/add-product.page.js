import { Button, Form } from "antd";
import { ProductMutationTemplate } from "components/templates";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { ProductService } from "services";
import { VitalInformationForm } from "./vital-infor-form/vital-infor-form.comp";

const AddProductPage = () => {
  const [form] = Form.useForm();
  const [formNewFields] = Form.useForm();

  const onSubmit = useCallback(async () => {
    formNewFields.validateFields();
  }, [formNewFields]);
  return (
    <>
      <Helmet title="Add Product" />
      <article className="air__utils__shadow bg-white p-4 dtc-br-10">
        <VitalInformationForm form={form} formNewFields={formNewFields} />
        <Button type="primary" htmlType="submit" onClick={onSubmit}>
          Submit
        </Button>
      </article>
      {/* <ProductMutationTemplate
        title="Product Creation"
        pageName="AddProductPage"
        mutateServiceFn={ProductService.addProduct}
      /> */}
    </>
  );
};

export default AddProductPage;
