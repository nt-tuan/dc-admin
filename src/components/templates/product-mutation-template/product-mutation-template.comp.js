import React, { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { DTCSection } from "components/atoms";
import { Button, Form, Steps } from "antd";
import { isScreensize } from "utils/general.util";
import VariantDetails from "./components/VariantsDetails";
import VitalInformation from "./components/VitalInformation";
import { PRODUCT_CREATE_TEMPLATE } from "./constants";
import "./product-mutation-template.comp.scss";
import { ProductTemplateImage } from "components/pages/add-product/product-template-image/product-template-image.comp";
import { ProductTemplateReview } from "components/organisms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";

const ALLOW_SKIP = [4, 5];

const { Step } = Steps;

export const ProductMutationTemplate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState({});
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [hsCode, setHsCode] = useState([]);

  const isSmallDevice = isScreensize("sm");
  const [vitalForm] = Form.useForm();
  const [formNewFields] = Form.useForm();
  const [variantDetailsForm] = Form.useForm();
  const [templateImageForm] = Form.useForm();

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const [categories, hsCode] = await Promise.all([
        ProductService.getProductCategories(),
        ProductService.getAllHsCode()
      ]);
      const parseHsCode = hsCode.map((code) => ({ id: code, name: code }));
      setCategories(categories);
      setHsCode(parseHsCode);
    });
  }, []);

  const getTypeByCategory = useCallback((catId) => {
    asyncErrorHandlerWrapper(async () => {
      const res = await ProductService.getProductTypeByCategory(catId);
      setTypes(res);
    });
  }, []);

  //submit data in current step
  const handleSubmitForm = useCallback(
    (name, { values, forms }) => {
      setProductData({ ...productData, [name]: values });
    },
    [productData]
  );

  //TODO: combine submit and get error
  const handleValidator = useCallback(() => {
    switch (currentStep) {
      case 1:
        vitalForm.submit();
        const isVitalFormValid = !Object.values(vitalForm.getFieldsValue())
          .filter((value) => value !== undefined) //for custom vital
          .some((fieldValue) => !fieldValue);
        const isFormNewFieldsValid =
          !vitalForm.getFieldsValue().customVital ||
          !vitalForm.getFieldsValue().customVital.some((obj) => !obj.name || !obj.value);
        return isVitalFormValid && isFormNewFieldsValid;
      case 6:
        templateImageForm.submit();
        return templateImageForm.getFieldsValue().productImage;
      default:
        break;
    }
    return true;
  }, [currentStep, vitalForm, templateImageForm]);

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
            <Step title={menu.title} key={menu.title} />
          ))}
        </Steps>
        <Form.Provider onFormFinish={handleSubmitForm}>
          {/* create form here form here */}
          {currentStep === 1 && (
            <VitalInformation
              form={vitalForm}
              formNewFields={formNewFields}
              categories={categories}
              onCategoryChange={getTypeByCategory}
              types={types}
              hsCode={hsCode}
            />
          )}
          {currentStep === 2 && <VariantDetails form={variantDetailsForm} />}
          {currentStep === 3 && <div>step 3</div>}
          {currentStep === 4 && <div>step 4</div>}
          {currentStep === 5 && <div>step 5</div>}
          {currentStep === 6 && <ProductTemplateImage form={templateImageForm} />}
          {currentStep === 7 && <ProductTemplateReview data={productData} />}
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
