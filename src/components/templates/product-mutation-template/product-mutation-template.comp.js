import React, { useCallback, useState, useMemo, useRef } from "react";
import { DTCSection } from "components/atoms";
import { Button, Form, Steps } from "antd";

import VariantDetails from "./components/VariantsDetails";
import VitalInformation from "./components/VitalInformation";

import { isScreensize } from "utils/general.util";
import { PRODUCT_CREATE_TEMPLATE } from "./constants";

import "./product-mutation-template.comp.scss";

const ALLOW_SKIP = [4, 5];

const { Step } = Steps;

export const ProductMutationTemplate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState({});

  const variantFormRef = useRef();

  const isSmallDevice = isScreensize("sm");
  const [vitalForm] = Form.useForm();
  const [formNewFields] = Form.useForm();

  //submit data in current step
  const handleSubmitForm = useCallback(
    (name, { values, forms }) => {
      console.log(values);
      setProductData({ ...productData, [name]: values });
    },
    [productData]
  );

  //TODO: combine submit and get error
  const handleValidator = useCallback(() => {
    switch (currentStep) {
      case 1:
        vitalForm.submit();
        formNewFields.submit();
        return !vitalForm.getFieldsError().length && formNewFields.getFieldsError().length > 1;
      default:
        break;
    }
    return true;
  }, [currentStep, vitalForm, formNewFields]);

  const handleChangeStep = useCallback(
    (targetStep) => {
      if (handleValidator()) {
        setCurrentStep(targetStep + 1);
      }
    },
    [handleValidator]
  );

  const handleNext = useCallback(async () => {
    if (currentStep === PRODUCT_CREATE_TEMPLATE.length) {
      // submit data
      return;
    } else {
      const isValid = await handleValidator();
      if (!isValid) return;
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
          {currentStep === 1 && <VitalInformation form={vitalForm} formNewFields={formNewFields} />}
          {currentStep === 2 && <VariantDetails ref={variantFormRef} />}
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
