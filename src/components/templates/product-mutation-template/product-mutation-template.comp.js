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
  const [hsCode, setHsCode] = useState({
    data: [],
    page: 0,
    totalPages: null,
    keyword: null
  });
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
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    const searchParams = window.location.search;
    if (searchParams) {
      const productId = searchParams.split("uid=")[1];
      asyncErrorHandlerWrapper(async () => {
        const productDetails = await ProductService.getProductDetails(productId);
        // const productDetails = await ProductService.getProductDetails(
        //   "fefddf2e-8004-40b5-bc08-df2078e3dfb7"
        // );
        setProductDetails(productDetails);
      });
    }
    asyncErrorHandlerWrapper(async () => {
      const [categories, hsCode] = await Promise.all([
        ProductService.getProductCategories(),
        ProductService.getAllHsCode()
      ]);
      const parseHsCode = hsCode?.content.map((item) => ({
        ...item,
        id: item.hsCode,
        name: item.hsCode
      }));
      setCategories(categories);
      setHsCode({
        data: [...parseHsCode],
        page: hsCode.number,
        totalPages: hsCode.totalPages
      });
    });
  }, [currentStep]);

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
        const formValue = values[formName].map((item, parentId) => {
          //Check if  child values available
          if (values["childValue"]) {
            values["childValue"].map((child) => {
              let id = child.parentId;
              let plotIndex = child.plotOption;
              if (child.isSet) return;
              //Check if parentID match to the child
              if (parentId == id) {
                item.fieldOption = item.fieldOption.map((opt, index) => {
                  //Check if plotOption Index match to the child
                  if (index == plotIndex) {
                    if (opt.childField) {
                      opt.childField.push(child);
                      child.isSet = true;
                    } else {
                      opt.childField = [child];
                      child.isSet = true;
                    }
                  }
                  return opt;
                });
              }
            });
          }
          return item;
        });
        setProductData({
          ...productData,
          details: { ...productData.details, [formName]: formValue }
        });
      }
    },
    [currentStep]
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
          "customVital",
          "keyword"
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
        fileName:
          productData?.ProductUploadImagesForm?.name ||
          productData?.ProductUploadImagesForm?.fileName,
        productName: productData.vitalInformation.productName,
        typeId: productData.vitalInformation.productType,
        variantList: Object.keys(productData.vitalInformation).map((key) => {
          //Checking keyword field has value and return to string to submit data
          if (key === "keyword" && productData.vitalInformation[key]) {
            return {
              name: key,
              value: productData.vitalInformation[key].toString()
            };
          }
          return {
            name: key,
            value: productData.vitalInformation[key]
          };
        })
      };

      asyncErrorHandlerWrapper(async () => {
        if (productDetails) {
          const searchParams = window.location.search;
          const productId = searchParams.split("uid=")[1];
          delete data.typeId;
          delete data.productName;
          data.keyword = productData.vitalInformation["keyword"]
            ? productData.vitalInformation["keyword"].toString()
            : "";
          data.productId = productId;
          await ProductService.editProduct(data, productId);
          message.success("Edit Successfully");
        } else {
          await ProductService.addProduct(data);
          message.success("Create Successfully");
        }
        setTimeout(() => {
          window.location.href = "/product-database";
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
        if (!isValidName && !productDetails) {
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
  }, [currentStep, handleValidator, productData, vitalForm, productDetails]);

  const isSkip = useCallback(() => {
    let isFormDirty = false;

    if (currentStep === 4 && productData) {
      let availableForm = Object.keys(productData?.details);

      if (availableForm.some((form) => form == "packingDetails")) {
        isFormDirty = true;
      }
    }
    if (currentStep === 5 && productData) {
      let availableForm = Object.keys(productData?.details);
      if (availableForm.some((form) => form == "certificationDetails")) {
        isFormDirty = true;
      }
    }
    if (ALLOW_SKIP.includes(currentStep) && skipAble && !isFormDirty) {
      return true;
    }
    return false;
  }, [currentStep, skipAble, productData]);

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
              productDetails={productDetails}
            />
          </div>
          <div className={classNames({ "d-none": currentStep !== 2 })}>
            <VariantDetails form={variantDetailsForm} productDetails={productDetails} />
          </div>
          <div className={classNames({ "d-none": currentStep !== 3 })}>
            <OfferDetails form={offerDetailsForm} productDetails={productDetails} />
          </div>
          <div className={classNames({ "d-none": currentStep !== 4 })}>
            <PackingDetails
              form={packingDetailsForm}
              {...{ handleFieldChange }}
              productDetails={productDetails}
            />
          </div>
          <div className={classNames({ "d-none": currentStep !== 5 })}>
            <CertificationDetails
              form={certificationForm}
              {...{ handleFieldChange }}
              productDetails={productDetails}
            />
          </div>
          <div className={classNames({ "d-none": currentStep !== 6 })}>
            <ProductTemplateImage
              ref={(ref) => (templateImageForm.current = ref)}
              productDetails={productDetails}
            />
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
