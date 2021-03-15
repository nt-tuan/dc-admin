import React, { useCallback, useState, useEffect, useRef } from "react";
import { Loader } from "components";
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

export const ProductMutationTemplate = ({ productDetails, isEditing = false }) => {
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
  const [canSkip, setCanSkip] = useState(false);

  //Set break-point for Progressive bar
  const isSmallDevice = isScreensize("lg");
  const [vitalForm] = Form.useForm();
  const [formNewFields] = Form.useForm();
  const [variantDetailsForm] = Form.useForm();
  const [offerDetailsForm] = Form.useForm();
  const [packingDetailsForm] = Form.useForm();
  const [certificationForm] = Form.useForm();
  const templateImageForm = useRef();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isEditing && categories.length && hsCode && types.length) {
      setLoading(false);
    }
    if (!isEditing && categories.length && hsCode) {
      setLoading(false);
    }
  }, [categories, types, hsCode, isEditing]);

  useEffect(() => {
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

  //submit data in current form
  const handleSubmitForm = useCallback(
    (name, { values }) => {
      if (name === "vitalInformation") {
        const vitalInfor = { ...values };
        delete vitalInfor.customVital;
        setProductData({
          ...productData,
          vitalInformation: vitalInfor,
          details: { ...productData.details, customVital: values?.customVital || [] }
        });
      } else {
        const formName = Object.keys(values)[0];
        const formValue = values[formName];
        const updatedProductData = {
          ...productData,
          details: { ...productData.details, [formName]: formValue }
        };
        setProductData(updatedProductData);
      }
    },
    [productData]
  );

  const isValidForm = useCallback((form) => {
    return form
      .validateFields()
      .then(() => {
        form.submit();
        return true;
      })
      .catch(() => false);
  }, []);

  //TODO: combine submit and get error
  const handleValidator = useCallback(async () => {
    switch (currentStep) {
      case 1:
        return isValidForm(vitalForm);
      case 2:
        return isValidForm(variantDetailsForm);
      case 3:
        return isValidForm(offerDetailsForm);
      case 4:
        return isValidForm(packingDetailsForm);
      case 5:
        return isValidForm(certificationForm);
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
    isValidForm,
    variantDetailsForm,
    offerDetailsForm,
    packingDetailsForm,
    certificationForm,
    productData
  ]);

  const checkCanSkip = useCallback(
    (step = currentStep, recentlyChangedValues) => {
      let isFormDirty = false;

      if (ALLOW_SKIP.includes(step)) {
        if (recentlyChangedValues) {
          const formName = Object.keys(recentlyChangedValues)[0];
          if (recentlyChangedValues[formName]?.length > 0) {
            isFormDirty = true;
          }
        } else {
          let values;
          if (step === 4) {
            values = packingDetailsForm.getFieldsValue();
          }
          if (step === 5) {
            values = certificationForm.getFieldsValue();
          }
          const formName = Object.keys(values)[0];
          if (values[formName]?.length > 0) {
            isFormDirty = true;
          }
        }
        setCanSkip(!isFormDirty);
      } else {
        setCanSkip(false);
      }
    },
    [certificationForm, currentStep, packingDetailsForm]
  );

  const handleValuesChange = useCallback(
    (recentlyChangedValues) => {
      checkCanSkip(currentStep, recentlyChangedValues);
    },
    [checkCanSkip, currentStep]
  );

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
        if (isEditing) {
          const searchParams = window.location.search;
          const productId = searchParams.split("uid=")[1];
          delete data.typeId;
          delete data.productName;
          data.keyword = productData.vitalInformation["keyword"]
            ? productData.vitalInformation["keyword"].toString()
            : "";
          data.productId = productId;
          await ProductService.editProduct(data, productId);
          message.success("Product was successfully updated!");
        } else {
          await ProductService.addProduct(data);
          message.success("Product was successfully created!");
        }
        setTimeout(() => {
          window.location.href = "/product-database";
        }, 1000);
      });
      return;
    } else {
      const isValid = await handleValidator();
      if (isValid) {
        checkCanSkip(currentStep + 1);
        setCurrentStep(currentStep + 1);
      }
    }
  }, [currentStep, productData, isEditing, handleValidator, checkCanSkip]);

  const handleSkip = useCallback(() => {
    checkCanSkip(currentStep + 1);
    setCurrentStep(currentStep + 1);
  }, [checkCanSkip, currentStep]);

  const handlePrevious = useCallback(() => {
    checkCanSkip(currentStep - 1);
    setCurrentStep(currentStep - 1);
  }, [checkCanSkip, currentStep]);

  return (
    <article>
      {loading && <Loader />}
      <>
        <DTCSection className={classNames({ "d-none": loading })}>
          <Steps
            className={null}
            current={currentStep - 1}
            size="default"
            direction={isSmallDevice ? "vertical" : "horizontal"}
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
                productDetails={productDetails}
                isEditing={isEditing}
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
                handleValuesChange={handleValuesChange}
                productDetails={productDetails}
              />
            </div>
            <div className={classNames({ "d-none": currentStep !== 5 })}>
              <CertificationDetails
                form={certificationForm}
                handleValuesChange={handleValuesChange}
                productDetails={productDetails}
              />
            </div>
            <div className={classNames({ "d-none": currentStep !== 6 })}>
              <ProductTemplateImage
                ref={(ref) => (templateImageForm.current = ref)}
                productImages={productDetails?.images}
              />
            </div>
            {currentStep === 7 && (
              <ProductTemplateReview data={productData} categories={categories} types={types} />
            )}
          </Form.Provider>
        </DTCSection>
        <div className={classNames("footer", { "d-none": loading, "mb-3": canSkip })}>
          {currentStep !== 1 && <Button onClick={handlePrevious}>Previous</Button>}
          {canSkip && (
            <Button danger onClick={handleSkip}>
              Skip Section
            </Button>
          )}
          {!canSkip && (
            <Button type="primary" onClick={handleNext} className="mb-3">
              {currentStep === PRODUCT_CREATE_TEMPLATE.length ? "Submit" : "Next"}
            </Button>
          )}
        </div>
      </>
    </article>
  );
};
