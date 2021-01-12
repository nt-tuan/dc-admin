import React, { useCallback, useState, useEffect, useRef } from "react";
import { DTCSection } from "components/atoms";
import { Button, Form, Steps, message } from "antd";
import classNames from "classnames";
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

const ALLOW_SKIP = [4, 5];

const { Step } = Steps;

export const ProductMutationTemplate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState({});
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [hsCode, setHsCode] = useState([]);
  const [skipAble, setSkipAble] = useState(true);

  //Set break-point for Progressive bar
  const isSmallDevice = isScreensize("lg");
  const [vitalForm] = Form.useForm();
  const [formNewFields] = Form.useForm();
  const [variantDetailsForm] = Form.useForm();
  const templateImageForm = useRef();
  const [offerDetailsForm] = Form.useForm();
  const [packingDetailsForm] = Form.useForm();
  const [certificationForm] = Form.useForm();

  const [isValidProductName, setIsValidProductName] = useState(true);

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
        const vitalInfor = { ...values };
        delete vitalInfor.customVital;
        setProductData({
          ...productData,
          vitalInformation: vitalInfor,
          details: { ...productData.details, customVital: values?.customVital || [] }
        });
      } else {
        const formName = Object.keys(values)[0];
        const formValue = values[formName].map((item, index) => {
          item.fieldOption = item.fieldOption.map((item, index) => {
            if (values["childValue"]) {
              item.childField = values["childValue"][index];
            }
            return item;
          });

          return item;
        });
        setProductData({
          ...productData,
          details: { ...productData.details, [formName]: formValue }
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
        const ignoreValidatorFieldList = [
          "headingLabel",
          "chapterLabel",
          "hsCodeDescription",
          "quantity",
          "customVital"
        ];
        const formVal = vitalForm.getFieldsValue();
        const isVitalFormValid = !Object.keys(formVal)
          .filter((key) => !ignoreValidatorFieldList.includes(key))
          .some((key) => !formVal[key]);
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
        setProductData({
          ...productData,
          ProductUploadImagesForm: templateImageForm.current.getValues()
        });
        return templateImageForm.current.getValues();
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
    packingDetailsForm,
    productData
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
        fileName: productData?.ProductUploadImagesForm?.name,
        productName: productData.vitalInformation.productName,
        typeId: productData.vitalInformation.productType,
        variantList: Object.keys(productData.vitalInformation).map((key) => {
          return {
            name: key,
            value: productData.vitalInformation[key]
          };
        })
      };
      asyncErrorHandlerWrapper(async () => {
        await ProductService.addProduct(data);
        message.success("Create Successfully");
        setTimeout(() => {
          window.location.href = "/add-product";
        }, 1000);
      });
      return;
    } else {
      const isValid = await handleValidator();
      if (!isValid) return;
      if (currentStep === 1) {
        const category = vitalForm.getFieldValue("productCategory");
        const type = vitalForm.getFieldValue("productType");
        const name = vitalForm.getFieldValue("productName");
        const isValidName = await ProductService.checkDuplicate({
          name,
          category,
          type
        });
        if (!isValidName) {
          vitalForm.setFields([
            {
              name: "productName",
              errors: ["This product has already been created"]
            }
          ]);
          return;
        }
      }
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSkipAble(true);
      }, 100);
    }
  }, [currentStep, handleValidator, productData, vitalForm]);

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
          <div className={classNames({ "d-none": currentStep !== 1 })}>
            <VitalInformation
              form={vitalForm}
              formNewFields={formNewFields}
              categories={categories}
              onCategoryChange={getTypeByCategory}
              types={types}
              hsCode={hsCode}
              isValidProductName={isValidProductName}
              setIsValidProductName={setIsValidProductName}
            />
          </div>
          <div className={classNames({ "d-none": currentStep !== 2 })}>
            <VariantDetails form={variantDetailsForm} />
          </div>
          <div className={classNames({ "d-none": currentStep !== 3 })}>
            <OfferDetails form={offerDetailsForm} />
          </div>
          <div className={classNames({ "d-none": currentStep !== 4 })}>
            <PackingDetails form={packingDetailsForm} {...{ handleFieldChange }} />
          </div>
          <div className={classNames({ "d-none": currentStep !== 5 })}>
            <CertificationDetails form={certificationForm} {...{ handleFieldChange }} />
          </div>
          <div className={classNames({ "d-none": currentStep !== 6 })}>
            <ProductTemplateImage ref={(ref) => (templateImageForm.current = ref)} />
          </div>
          {currentStep === 7 && (
            <ProductTemplateReview data={productData} categories={categories} types={types} />
          )}
        </Form.Provider>
      </DTCSection>
      <div className={`footer ${isSkip() && "mb-3"}`}>
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
