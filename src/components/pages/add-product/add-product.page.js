import { Stepper } from "components/atoms";
import {
  ProductDescriptionForm,
  ProductReviewReadOnly,
  ProductUploadImages,
  VitalInfoForm
} from "components/organisms";
import React, { forwardRef, useRef } from "react";
import { Helmet } from "react-helmet";

const AddProductPage = forwardRef((props, ref) => {
  const vitalFormRef = useRef();
  const proDesRef = useRef();
  const productImgRef = useRef();

  const canMoveNextTemplate = async (asyncValidateFn) => {
    try {
      await asyncValidateFn();
      return true;
    } catch (error) {
      return false;
    }
  };

  const Steps = useRef([
    {
      title: "Vital Information",
      canMoveNext: async () => canMoveNextTemplate(vitalFormRef.current.validateFields),
      component: <VitalInfoForm ref={vitalFormRef} />
    },
    {
      title: "Product Description",
      canMoveNext: async () => canMoveNextTemplate(proDesRef.current.validateFields),
      component: <ProductDescriptionForm ref={proDesRef} />
    },
    {
      title: "Product Image",
      canMoveNext: async () => canMoveNextTemplate(productImgRef.current.validateFields),
      component: <ProductUploadImages ref={productImgRef} />
    },
    {
      title: "Review",
      onNext: () => {},
      component: <ProductReviewReadOnly />
    }
  ]).current;

  const handleSubmit = () => {
    console.log(vitalFormRef.current.getFieldsValue());
    console.log(proDesRef.current.getFieldsValue());
    console.log(productImgRef.current.getFieldsValue());
  };

  return (
    <article>
      <Helmet title="Add product" />
      <Stepper title="Product Creation" steps={Steps} onSubmit={handleSubmit} />
    </article>
  );
});

export default AddProductPage;
