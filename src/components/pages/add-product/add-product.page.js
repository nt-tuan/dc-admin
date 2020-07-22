import React, { useRef, forwardRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Stepper } from "components/atoms";
import {
  ProductDescriptionForm,
  ProductUploadImages,
  ProductReviewReadOnly,
  VitalInfoForm
} from "components/organisms";

const ProductDatabase = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const vitalFormRef = useRef();
  const proDesRef = useRef();
  const productImgRef = useRef();

  const getSteps = () => [
    {
      title: "Vital Information",
      onNext: () => vitalFormRef.current.validateFields()
    },
    {
      title: "Product Description",
      onNext: () => proDesRef.current.validateFields()
    },
    {
      title: "Product Image",
      onNext: () => productImgRef.current.validateFields()
    },
    {
      title: "Review",
      onNext: () => {}
    }
  ];

  const renderStepContent = (currentStep) => {
    switch (currentStep) {
      case 1: {
        return <ProductDescriptionForm ref={proDesRef} />;
      }
      case 2: {
        return <ProductUploadImages ref={productImgRef} />;
      }
      case 3: {
        return <ProductReviewReadOnly />;
      }
      default: {
        return <VitalInfoForm ref={vitalFormRef} />;
      }
    }
  };

  const handleSaveData = (step, value) => {
    data[step] = value;
    setData([...data]);
    localStorage.setItem("productData", JSON.stringify(data));
  };

  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <article>
      <Helmet title="Add product" />
      <Stepper
        title="Product Creation"
        steps={getSteps()}
        renderStepContent={renderStepContent}
        onSave={handleSaveData}
        onSubmit={handleSubmit}
        savedDataArray={data}
      />
    </article>
  );
});

export default ProductDatabase;
