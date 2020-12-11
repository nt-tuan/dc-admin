import React, { useCallback, useState, useEffect } from "react";
import { DTCSection } from "components/atoms";
import { Button, Form, Steps } from "antd";
import { isScreensize } from "utils/general.util";
import VariantDetails from "./components/VariantsDetails";
import OfferDetails from "./components/OfferDetails";
import PackingDetails from "./components/PackingDetails";
import CertificationDetails from "./components/CertificationDetails";
import VitalInformation from "./components/VitalInformation";
import { PRODUCT_CREATE_TEMPLATE } from "./constants";
import "./product-mutation-template.comp.scss";
import { ProductTemplateImage } from "components/pages/add-product/product-template-image/product-template-image.comp";
import { ProductTemplateReview } from "components/organisms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";
import isEmpty from "lodash/isEmpty";

const ALLOW_SKIP = [4, 5];

const { Step } = Steps;

export const ProductMutationTemplate = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [productData, setProductData] = useState({});
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [hsCode, setHsCode] = useState([]);
  const [skipAble, setSkipAble] = useState(true);

  const isSmallDevice = isScreensize("sm");
  const [vitalForm] = Form.useForm();
  const [formNewFields] = Form.useForm();
  const [variantDetailsForm] = Form.useForm();
  const [offerDetailsForm] = Form.useForm();
  const [packingDetailsForm] = Form.useForm();
  const [certificationForm] = Form.useForm();
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
      if (currentStep === 1) {
        setProductData({ vitalInformation: values });
      } else {
        const formName = Object.keys(values)[0];
        setProductData({
          ...productData,
          details: { ...productData.details, [formName]: values[formName] }
        });
      }
    },
    [productData, currentStep]
  );

  const getErrorField = useCallback((form) => {
    const formValue = Object.values(form.getFieldsValue())?.length
      ? Object.values(form.getFieldsValue())[0]
      : [];
    const errorField = formValue?.find((value) => {
      if (!value?.fieldName || !value?.type) {
        return true;
      }
      if (value?.fieldOption[0] === "") {
        return true;
      }
      if (value.type === "textbox") {
        if (!value?.fieldOption[0].allowInput || !value?.fieldOption[0].textboxType) {
          return true;
        }
      } else {
        if (value?.fieldOption?.find((childValue) => !childValue.label)) {
          return true;
        }
      }

      return false;
    });
    return errorField;
  }, []);

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
      case 2:
        variantDetailsForm.submit();
        return !getErrorField(variantDetailsForm);
      case 3:
        offerDetailsForm.submit();
        return !getErrorField(offerDetailsForm);
      case 4:
        packingDetailsForm.submit();
        return !getErrorField(packingDetailsForm);
      case 5:
        certificationForm.submit();
        return !getErrorField(certificationForm);
      case 6:
        templateImageForm.submit();
        return templateImageForm.getFieldsValue().productImage;
      default:
        break;
    }
    return true;
  }, [
    currentStep,
    vitalForm,
    templateImageForm,
    variantDetailsForm,
    getErrorField,
    offerDetailsForm,
    certificationForm,
    packingDetailsForm
  ]);

  const handleChangeStep = useCallback((targetStep) => {
    // if (handleValidator()) {
    //   setCurrentStep(targetStep + 1);
    // }
    return;
  }, []);

  const handleNext = useCallback(async () => {
    if (currentStep === PRODUCT_CREATE_TEMPLATE.length) {
      // submit data
      const data = {
        detail: JSON.stringify(productData.details),
        fileName: productData?.details?.productImage[0]?.name,
        productName: productData.vitalInformation.productName,
        typeId: productData.vitalInformation.productType,
        variantList: Object.keys(productData.vitalInformation)
          .filter((key) => key !== "customVital")
          .map((key) => {
            return {
              name: key,
              value: productData.vitalInformation[key]
            };
          })
      };
      asyncErrorHandlerWrapper(async () => {
        ProductService.addProduct(data);
      });
      return;
    } else {
      const isValid = await handleValidator();
      if (!isValid) return;
      setCurrentStep(currentStep + 1);
      setSkipAble(true);
    }
  }, [currentStep, handleValidator, productData]);

  const isSkip = useCallback(() => {
    // let isFormDirty = false;
    // if (currentStep === 4) {
    //   const formValue = packingDetailsForm.getFieldsValue;
    //   isFormDirty = !isEmpty(formValue);
    // }
    if (ALLOW_SKIP.includes(currentStep) && skipAble) {
      return true;
    }
    return false;
  }, [currentStep, skipAble]);

  const handleFieldChange = useCallback(() => {
    setSkipAble(false);
  }, []);

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
          {currentStep === 3 && <OfferDetails form={offerDetailsForm} />}
          {currentStep === 4 && (
            <PackingDetails form={packingDetailsForm} {...{ handleFieldChange }} />
          )}
          {currentStep === 5 && (
            <CertificationDetails form={certificationForm} {...{ handleFieldChange }} />
          )}
          {currentStep === 6 && <ProductTemplateImage form={templateImageForm} />}
          {currentStep === 7 && (
            <ProductTemplateReview data={productData} categories={categories} types={types} />
          )}
        </Form.Provider>
      </DTCSection>
      <div className="footer">
        {currentStep !== 1 && (
          <Button onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>
        )}
        {isSkip() && (
          <Button danger onClick={() => setCurrentStep(currentStep + 1)}>
            Skip Section
          </Button>
        )}
        {!isSkip() && (
          <Button type="primary" onClick={handleNext} className="mb-3">
            {currentStep === PRODUCT_CREATE_TEMPLATE.length ? "Submit" : "Next"}
          </Button>
        )}
      </div>
    </article>
  );
};
