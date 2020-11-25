import React, { useCallback, useState, useMemo } from "react";
import { DTCSection } from "components/atoms";
import { Button, Form, Steps } from "antd";

import { isScreensize } from "utils/general.util";

import "./product-mutation-template.comp.scss";

const PRODUCT_CREATE_TEMPLATE = [
  { title: "Vital Information" },
  { title: "Variant Details" },
  { title: "Offer Details" },
  { title: "Packing Details" },
  { title: "Certifications Details" },
  { title: "Product Template Image" },
  { title: "Review" }
];

const ALLOW_SKIP = [4, 5];

const { Step } = Steps;

export const ProductMutationTemplate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState({});

  const isSmallDevice = isScreensize("sm");

  //submit data in current step
  const handleSubmitForm = useCallback(
    (name, { values, forms }) => {
      setProductData({ ...productData, [name]: values });
    },
    [productData]
  );

  //validate form in current step
  const handleValidator = useCallback(() => {
    let error = [1];
    switch (currentStep) {
      case 1:
        //Vital form validate and submit form
        break;

      default:
        break;
    }
    return !!error.length;
  }, [currentStep]);

  const handleChangeStep = useCallback(
    (targetStep) => {
      if (handleValidator()) {
        setCurrentStep(targetStep + 1);
      }
    },
    [handleValidator]
  );

  const handleNext = useCallback(() => {
    if (currentStep === PRODUCT_CREATE_TEMPLATE.length) {
      // submit data
      return;
    } else {
      if (!handleValidator()) return;
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, handleValidator]);

  const isSkip = useMemo(() => {
    if (ALLOW_SKIP.includes(currentStep)) {
      return true;
    }
    return false;
  }, [currentStep]);

  return (
    <article>
      <DTCSection>
        <Steps
          className={null}
          current={currentStep - 1}
          size="default"
          direction={isSmallDevice ? "vertical" : "horizontal"}
          onChange={handleChangeStep}
          progressDot
        >
          {PRODUCT_CREATE_TEMPLATE.map((menu) => (
            <Step title={menu.title} />
          ))}
        </Steps>
        <Form.Provider onFormFinish={handleSubmitForm}>
          {/* create form here form here */}
          {currentStep === 1 && <div>step 1</div>}
          {currentStep === 2 && <div>step 2</div>}
          {currentStep === 3 && <div>step 3</div>}
          {currentStep === 4 && <div>step 4</div>}
          {currentStep === 5 && <div>step 5</div>}
          {currentStep === 6 && <div>step 6</div>}
          {currentStep === 7 && <div>step 7</div>}
        </Form.Provider>
      </DTCSection>
      <div className="footer">
        {currentStep !== 1 && (
          <Button onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>
        )}
        {isSkip && <Button danger>Skip Section</Button>}
        <Button type="primary" onClick={handleNext}>
          {currentStep === PRODUCT_CREATE_TEMPLATE.length ? "Submit" : "Next"}
        </Button>
      </div>
    </article>
  );
};
