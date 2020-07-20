import React, { useRef, forwardRef, useState } from "react";
import {
  VitalInfoForm,
  ProductDescriptionForm,
  ProductUploadImages,
  ProductReviewReadOnly
} from "components/organisms";
import { Button, Steps } from "antd";
import { isScreensize } from "utils/general.util";

const { Step } = Steps;

const PRODUCT_STEPS = {
  step1: {
    title: "Vital Information"
  },
  step2: {
    title: "Product Description"
  },
  step3: {
    title: "Product Image"
  },
  step4: {
    title: "Review"
  }
};

export const Stepper = forwardRef(({ title }, ref) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isSmallDevice = isScreensize("sm");
  const vitalFormRef = useRef();
  const proDesRef = useRef();
  const productImgRef = useRef();

  const handleNextClick = async () => {
    // const vitalFormRes = await vitalFormRef.current.validateFields();
    currentStep < 3 && setCurrentStep(currentStep + 1);
  };

  const handlePrevClick = () => {
    currentStep > 0 && setCurrentStep(currentStep - 1);
  };

  const handleSubmitClick = () => {
    setCurrentStep(0);
  };

  const renderStepContent = () => {
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

  return (
    <div className="dtc-br-10 air__utils__shadow bg-white p-4">
      <h5 className="text-center p-3">{title}</h5>
      <div>
        <Steps
          className={null}
          current={currentStep}
          labelPlacement="vertical"
          size="default"
          direction={isSmallDevice ? "vertical" : "horizontal"}
          onChange={(value) => setCurrentStep(value)}
        >
          {Object.values(PRODUCT_STEPS).map((step, index) => (
            <Step
              key={step.title}
              description={step.title}
              icon={index === currentStep ? <i className="fe fe-edit" /> : null}
            />
          ))}
        </Steps>
        <div className="my-4">{renderStepContent()}</div>
        <div className="d-flex justify-content-end">
          {currentStep > 0 && (
            <Button type="primary" onClick={handlePrevClick}>
              Previous
            </Button>
          )}
          {currentStep === 3 ? (
            <Button className="ml-2" type="primary" onClick={handleSubmitClick}>
              Submit
            </Button>
          ) : (
            <Button className="ml-2" type="primary" onClick={handleNextClick}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});
