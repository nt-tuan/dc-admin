import "./product-mutation-template.comp.scss";

import { Button, Form, Steps } from "antd";
import { DTCSection, Loader } from "@/components/commons";
import React, { useCallback, useEffect, useRef, useState } from "react";

import CertificationDetails from "./components/CertificationDetails";
import { EMPTY_FIELD, PRODUCT_CREATE_TEMPLATE } from "./constants";
import { Lagecy } from "@/components/lagecy/lagecy.comp";
import OfferDetails from "./components/OfferDetails";
import PackingDetails from "./components/PackingDetails";
import { ProductService } from "@/services";
import { ProductTemplateImage } from "@/pages/add-product/product-template-image/product-template-image.comp";
import { ProductTemplateReview } from "@/components/product-template-review/product-template-review.comp";
import { RouteConst } from "@/commons/consts";
import Stack from "@mui/material/Stack";
import VariantDetails from "./components/VariantsDetails";
import VitalInformation from "./components/VitalInformation";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import classNames from "classnames";
import { equalFields } from "@/utils/form.util";
import { isScreensize } from "@/utils/general.util";
import { useHistory } from "react-router-dom";
import { useMessage } from "@/hooks/use-message";
import { useSubmitApiService } from "@/hooks/useApiService";

const ALLOW_SKIP = [4, 5];

const { Step } = Steps;

export const ProductMutationTemplate = ({ productDetails, isEditing = false }) => {
  const message = useMessage();
  const history = useHistory();
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

  const onAfterSubmit = useCallback(() => {
    if (isEditing) {
      message.success("Product was successfully updated!");
    } else {
      message.success("Product was successfully created!");
    }
    setTimeout(() => {
      history.push(RouteConst.PRODUCT_DATABASE);
    }, 1000);
  }, [history, message, isEditing]);

  const [loading, setLoading] = useState(true);
  const [
    { isLoading: isSubmitting, success: submitted },
    { submit: addProduct }
  ] = useSubmitApiService(ProductService.addProduct, onAfterSubmit);
  const [
    { isLoading: isUpdating, success: updated },
    { submit: editProduct }
  ] = useSubmitApiService(ProductService.editProduct, onAfterSubmit);
  const disabledButtons = isUpdating || isSubmitting || updated || submitted;

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
    // eslint-disable-next-line sonarjs/cognitive-complexity
    (step = currentStep, recentlyChangedValues) => {
      let isFormDirty = false;
      let values;
      let formName;
      let hasEmptyField = false;

      if (ALLOW_SKIP.includes(step)) {
        if (recentlyChangedValues) {
          const formName = Object.keys(recentlyChangedValues)[0];
          isFormDirty = recentlyChangedValues[formName]?.length > 0;
          hasEmptyField =
            recentlyChangedValues[formName].length === 1 &&
            equalFields(recentlyChangedValues[formName][0], EMPTY_FIELD);
        } else {
          if (step === 4) {
            values = packingDetailsForm.getFieldsValue();
          }
          if (step === 5) {
            values = certificationForm.getFieldsValue();
          }
          formName = Object.keys(values)[0];
          isFormDirty = values[formName]?.length > 0;
          hasEmptyField =
            values[formName].length === 1 && equalFields(values[formName][0], EMPTY_FIELD);
        }

        if (hasEmptyField) {
          // form can have 1 item with empty values
          setCanSkip(true);
        } else {
          setCanSkip(!isFormDirty);
        }
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

  const submitTemplate = useCallback(() => {
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
        if (key === "keyword" && productData.vitalInformation[key]?.length >= 0) {
          return {
            name: key,
            value: productData.vitalInformation[key].toString()
          };
        } else {
          return {
            name: key,
            value: productData.vitalInformation[key]
          };
        }
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
        editProduct(data, productId);
      } else {
        addProduct(data);
      }
    });
  }, [addProduct, editProduct, isEditing, productData]);

  const handleNext = useCallback(async () => {
    if (currentStep === PRODUCT_CREATE_TEMPLATE.length) {
      submitTemplate();
    } else {
      const isValid = await handleValidator();
      if (isValid) {
        checkCanSkip(currentStep + 1);
        setCurrentStep(currentStep + 1);
      }
    }
  }, [currentStep, submitTemplate, handleValidator, checkCanSkip]);

  const handleSkip = useCallback(() => {
    if (ALLOW_SKIP.includes(currentStep)) {
      let values;
      if (currentStep === 4) {
        values = packingDetailsForm.getFieldsValue();
        packingDetailsForm.resetFields();
      } else {
        values = certificationForm.getFieldsValue();
        certificationForm.resetFields();
      }

      // remove data if skipping
      const formName = Object.keys(values)[0];
      const updatedProductData = {
        ...productData,
        details: { ...productData.details, [formName]: undefined }
      };
      setProductData(updatedProductData);
    }
    checkCanSkip(currentStep + 1);
    setCurrentStep(currentStep + 1);
  }, [certificationForm, checkCanSkip, currentStep, packingDetailsForm, productData]);

  const handlePrevious = useCallback(() => {
    checkCanSkip(currentStep - 1);
    setCurrentStep(currentStep - 1);
  }, [checkCanSkip, currentStep]);

  const NextButton = useCallback(() => {
    const isFinalStep = currentStep === PRODUCT_CREATE_TEMPLATE.length;
    let buttonText;
    const buttonLoading = isSubmitting || isUpdating;

    if (isFinalStep) {
      if (isSubmitting) {
        buttonText = "Submitting";
      } else if (isUpdating) {
        buttonText = "Updating";
      } else if (isEditing) {
        buttonText = "Update";
      } else {
        buttonText = "Submit";
      }
    } else {
      buttonText = "Next";
    }
    return (
      <Button
        type="primary"
        onClick={handleNext}
        className="mb-3"
        disabled={disabledButtons}
        loading={buttonLoading}
      >
        {buttonText}
      </Button>
    );
  }, [currentStep, disabledButtons, handleNext, isEditing, isSubmitting, isUpdating]);

  return (
    <article>
      <Lagecy>
        {loading && <Loader />}
        <>
          <DTCSection className={classNames({ "d-none": loading })}>
            <DTCSection.Content>
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
                  <VariantDetails
                    form={variantDetailsForm}
                    productDetails={productDetails}
                    isEditing={isEditing}
                  />
                </div>
                <div className={classNames({ "d-none": currentStep !== 3 })}>
                  <OfferDetails
                    form={offerDetailsForm}
                    productDetails={productDetails}
                    isEditing={isEditing}
                  />
                </div>
                <div className={classNames({ "d-none": currentStep !== 4 })}>
                  <PackingDetails
                    form={packingDetailsForm}
                    onValuesChange={handleValuesChange}
                    productDetails={productDetails}
                    isEditing={isEditing}
                  />
                </div>
                <div className={classNames({ "d-none": currentStep !== 5 })}>
                  <CertificationDetails
                    form={certificationForm}
                    onValuesChange={handleValuesChange}
                    productDetails={productDetails}
                    isEditing={isEditing}
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
            </DTCSection.Content>
          </DTCSection>
          <Stack mt={2}>
            <div className={classNames("footer", { "d-none": loading, "mb-3": canSkip })}>
              {currentStep !== 1 && (
                <Button onClick={handlePrevious} disabled={disabledButtons}>
                  Previous
                </Button>
              )}
              {canSkip && (
                <Button danger onClick={handleSkip} disabled={disabledButtons}>
                  Skip Section
                </Button>
              )}
              {!canSkip && NextButton()}
            </div>
          </Stack>
        </>
      </Lagecy>
    </article>
  );
};
