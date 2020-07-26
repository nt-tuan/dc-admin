import { Stepper } from "components/atoms";
import {
  ProductDescriptionForm,
  ProductReviewReadOnly,
  ProductUploadImagesForm,
  VitalInfoForm
} from "components/organisms";
import React, { forwardRef, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";
import { Form } from "antd";

const AddProductPage = forwardRef((props, ref) => {
  const vitalFormRef = useRef();
  const proDesFormRef = useRef();
  const productImgFormRef = useRef();
  const [vitalInfoData, setVitalInfoData] = useState({});
  const [variantData, setVariantData] = useState({});
  const [imagesData, setImagesData] = useState({ productImageName: {} });

  const canMoveTemplate = async (asyncValidateFn, setDataFn) => {
    try {
      await asyncValidateFn();
      setDataFn && setDataFn();
      return true;
    } catch (error) {
      return false;
    }
  };

  const Steps = [
    {
      stepIndex: 0,
      title: "Vital Information",
      canMove: async () =>
        canMoveTemplate(vitalFormRef.current.validateFields, () =>
          setVitalInfoData(vitalFormRef.current.getFieldsValue())
        ),
      component: <VitalInfoForm ref={vitalFormRef} />
    },
    {
      stepIndex: 1,
      title: "Product Description",
      canMove: async () =>
        canMoveTemplate(proDesFormRef.current.validateFields, () =>
          setVariantData(proDesFormRef.current.getFieldsValue())
        ),
      component: <ProductDescriptionForm ref={proDesFormRef} />
    },
    {
      stepIndex: 2,
      title: "Product Image",
      canMove: async () =>
        canMoveTemplate(productImgFormRef.current.validateFields, () =>
          setImagesData(productImgFormRef.current.getFieldsValue())
        ),
      component: <ProductUploadImagesForm ref={productImgFormRef} />
    },
    {
      stepIndex: 3,
      title: "Review",
      component: (
        <ProductReviewReadOnly
          data={{
            ...vitalInfoData,
            imgUrl: imagesData.productImageName.url,
            variantList: { ...variantData, Brand: vitalInfoData.brand }
          }}
        />
      )
    }
  ];

  const handleSubmit = () => {
    const composedData = {
      ...vitalInfoData,
      fileName: imagesData.productImageName.name,
      variantList: Object.keys(variantData).map((field) => ({
        name: field,
        value: variantData[field]
      }))
    };
    asyncErrorHandlerWrapper(async () => {
      await ProductService.addProduct(composedData);
    });
  };

  return (
    <article>
      <Helmet title="Add product" />
      <Form.Provider
      // onFormChange={(formName, info) => {
      //   console.log("AddProductPage -> formName, info", formName, info);
      // }}
      >
        <Stepper title="Product Creation" steps={Steps} onSubmit={handleSubmit} />
      </Form.Provider>
    </article>
  );
});

export default AddProductPage;
