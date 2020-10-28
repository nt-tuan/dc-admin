import { Button, Form, Result } from "antd";
import { RouteConst } from "commons/consts";
import { DTCSection, Stepper } from "components/atoms";
import {
  ProductDescriptionForm,
  ProductReviewReadOnly,
  ProductUploadImagesForm,
  VitalInfoForm
} from "components/organisms";
import debounce from "lodash/debounce";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as STORAGE_DUCK from "redux/storage/storage.duck";
import { ImageService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const canMoveTemplate = async (asyncValidateFn, setDataFn) => {
  try {
    await asyncValidateFn();
    return true;
  } catch (error) {
    return false;
  }
};

export const ProductMutationTemplate = ({ pageName, initialValues, mutateServiceFn, title }) => {
  const dispatch = useDispatch();
  const [showLoadSavedResult, setShowSavedResult] = useState(false);
  const vitalFormRef = useRef({ getFieldsValue: () => ({}) });
  const variantFormRef = useRef({ getFieldsValue: () => ({}) });
  const productImgFormRef = useRef({ getFieldsValue: () => ({}) });
  const draftedFormData = useSelector(STORAGE_DUCK.selectPageData(pageName));
  const [isUploading, setIsUploading] = useState(false);
  const history = useHistory();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const vitalInfoData = vitalFormRef.current.getFieldsValue();
  const variantData = variantFormRef.current.getFieldsValue();
  const imagesData = productImgFormRef.current.getFieldsValue();

  const handleUploadImage = async ({ onSuccess, onError, file }) => {
    setIsUploading(true);
    if (file.size / 1024 / 1024 < 5) {
      const res = await ImageService.uploadImage(file);
      onSuccess({ ...res, status: "done", uid: res.name });
    }
    setIsUploading(false);
  };

  useEffect(() => {
    if (initialValues !== undefined) {
      vitalFormRef.current.setFieldsValue(initialValues.vitalInfoData);
      variantFormRef.current.setFieldsValue(initialValues.variantData);
      productImgFormRef.current.setFieldsValue(initialValues.imagesData);
      forceUpdate();
    }
  }, [initialValues]);

  useEffect(() => {
    draftedFormData !== undefined && setShowSavedResult(true);
  }, [draftedFormData]);

  useEffect(() => {
    dispatch({ type: STORAGE_DUCK.GET_FROM_STORAGE, payload: { pageName } });
  }, [dispatch, pageName]);

  const Steps = [
    {
      stepIndex: 0,
      title: "Vital Information",
      canMove: async () => true,
      component: <VitalInfoForm ref={vitalFormRef} />
    },
    {
      stepIndex: 1,
      title: "Product Description",
      canMove: async () => canMoveTemplate(vitalFormRef.current.validateFields),
      component: <ProductDescriptionForm ref={variantFormRef} />
    },
    {
      stepIndex: 2,
      title: "Product Image",
      canMove: async () => {
        const isStep1Valid = await canMoveTemplate(vitalFormRef.current.validateFields);
        const isStep2Valid = await canMoveTemplate(variantFormRef.current.validateFields);
        return isStep1Valid && isStep2Valid;
      },
      component: (
        <ProductUploadImagesForm ref={productImgFormRef} handleUploadImage={handleUploadImage} />
      )
    },
    {
      stepIndex: 3,
      title: "Review",
      canMove: async () => {
        const isStep1Valid = await canMoveTemplate(vitalFormRef.current.validateFields);
        const isStep2Valid = await canMoveTemplate(variantFormRef.current.validateFields);
        const isStep3Valid = await canMoveTemplate(productImgFormRef.current.validateFields);
        isStep1Valid && isStep2Valid && isStep3Valid && forceUpdate();
        return isStep1Valid && isStep2Valid && isStep3Valid && isUploading === false;
      },
      component: (
        <ProductReviewReadOnly
          data={{
            ...vitalInfoData,
            imgUrl:
              imagesData.productImageName &&
              imagesData.productImageName[0] &&
              imagesData.productImageName[0].url,
            variantList: { ...variantData, Brand: vitalInfoData.brand }
          }}
        />
      )
    }
  ];

  const handleSubmit = () => {
    const composedData = {
      ...vitalInfoData,
      category: undefined,
      type: "Perfume",
      keyword: vitalInfoData.keyword.join(","),
      fileName: imagesData.productImageName[0].name,
      variantList: Object.keys(variantData).map((field) => ({
        name: field,
        value: variantData[field]
      }))
    };
    asyncErrorHandlerWrapper(async () => {
      await mutateServiceFn(composedData);
      handleClearDraftedFormData();
      history.push(RouteConst.PRODUCT_DATABASE);
    });
  };

  const saveDraftedFormData = () => {
    if (
      vitalFormRef.current === null ||
      variantFormRef.current === null ||
      productImgFormRef.current === null
    ) {
      return;
    }
    const vitalInfoData = vitalFormRef.current.getFieldsValue();
    const variantData = variantFormRef.current.getFieldsValue();
    const imagesData = productImgFormRef.current.getFieldsValue();
    const composedData = {
      vitalInfoData,
      variantData,
      imagesData
    };
    dispatch({
      type: STORAGE_DUCK.SAVE_TO_STORAGE,
      payload: { pageName, data: { data: composedData, timestamp: Date.now() } }
    });
  };

  const handleFormChange = debounce(() => {
    showLoadSavedResult === true && setShowSavedResult(false);
    saveDraftedFormData();
  }, 1500);

  const handleLoadDraftedFormData = () => {
    vitalFormRef.current.setFieldsValue(draftedFormData.data.vitalInfoData);
    variantFormRef.current.setFieldsValue(draftedFormData.data.variantData);
    productImgFormRef.current.setFieldsValue(draftedFormData.data.imagesData);
    setShowSavedResult(false);
  };

  const handleClearDraftedFormData = () => {
    dispatch({ type: STORAGE_DUCK.CLEAR_FROM_STORAGE, payload: { pageName } });
    setShowSavedResult(false);
  };

  return (
    <article>
      {showLoadSavedResult && (
        <DTCSection>
          <Result
            status="info"
            title={
              draftedFormData.timestamp
                ? "Do you want to restore your unfinished product creation from the previous session?"
                : ""
            }
            extra={[
              <Button type="primary" key="okay" onClick={handleLoadDraftedFormData}>
                Okay
              </Button>,
              <Button type="primary" key="no" danger onClick={handleClearDraftedFormData}>
                No
              </Button>
            ]}
          />
        </DTCSection>
      )}
      <DTCSection hidden={showLoadSavedResult}>
        <Form.Provider onFormChange={handleFormChange}>
          <Stepper title={title} steps={Steps} onSubmit={handleSubmit} />
        </Form.Provider>
      </DTCSection>
    </article>
  );
};
