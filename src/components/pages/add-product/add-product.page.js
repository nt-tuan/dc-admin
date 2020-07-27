import { Button, Form, Result } from "antd";
import { DTCSection, Stepper } from "components/atoms";
import {
  ProductDescriptionForm,
  ProductReviewReadOnly,
  ProductUploadImagesForm,
  VitalInfoForm
} from "components/organisms";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import React, { forwardRef, useEffect, useRef, useState, useReducer } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import * as STORAGE_DUCK from "redux/storage/storage.duck";
import { ProductService, ImageService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { RouteConst } from "commons/consts";

const canMoveTemplate = async (asyncValidateFn, setDataFn) => {
  try {
    await asyncValidateFn();
    return true;
  } catch (error) {
    return false;
  }
};

const handleUploadImage = async ({ onSuccess, onError, file }) => {
  try {
    const res = await ImageService.uploadImage(file);
    setTimeout(() => {
      onSuccess({ ...res, status: "done", uid: res.name });
    }, 2000);
  } catch (error) {
    onError(error);
  }
};

const AddProductPage = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [showLoadSavedResult, setShowSavedResult] = useState(false);
  const vitalFormRef = useRef({ getFieldsValue: () => ({}) });
  const variantFormRef = useRef({ getFieldsValue: () => ({}) });
  const productImgFormRef = useRef({ getFieldsValue: () => ({}) });
  const draftedFormData = useSelector(STORAGE_DUCK.selectPageData("AddProductPage"));
  const history = useHistory();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const vitalInfoData = vitalFormRef.current.getFieldsValue();
  const variantData = variantFormRef.current.getFieldsValue();
  const imagesData = productImgFormRef.current.getFieldsValue();

  useEffect(() => {
    draftedFormData !== undefined && setShowSavedResult(true);
  }, [draftedFormData]);

  useEffect(() => {
    // ProductService.deleteProduct("7d64af15-0b13-48a2-b7f8-c084fa6ad6eb");
    ProductService.getProducts();
  }, []);

  useEffect(() => {
    dispatch({ type: STORAGE_DUCK.GET_FROM_STORAGE, payload: { pageName: "AddProductPage" } });
  }, [dispatch]);

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
        return isStep1Valid && isStep2Valid && isStep3Valid;
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
      keyword: vitalInfoData.keyword.join(","),
      fileName: imagesData.productImageName[0].name,
      variantList: Object.keys(variantData).map((field) => ({
        name: field,
        value: variantData[field]
      }))
    };
    console.log(composedData);
    asyncErrorHandlerWrapper(async () => {
      await ProductService.addProduct(composedData);
      handleClearDraftedFormData();
      history.push(RouteConst.PRODUCT_DATABASE);
    });
  };

  const saveDraftedFormData = () => {
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
      payload: { pageName: "AddProductPage", data: { data: composedData, timestamp: Date.now() } }
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
    dispatch({ type: STORAGE_DUCK.CLEAR_FROM_STORAGE, payload: { pageName: "AddProductPage" } });
    setShowSavedResult(false);
  };

  return (
    <article>
      <Helmet title="Add product" />
      {showLoadSavedResult && (
        <DTCSection>
          <Result
            status="info"
            title={
              draftedFormData.timestamp
                ? `Do you want to restore what you have input ${dayjs(
                    draftedFormData.timestamp
                  ).fromNow()}`
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
          <Stepper title="Product Creation" steps={Steps} onSubmit={handleSubmit} />
        </Form.Provider>
      </DTCSection>
    </article>
  );
});

export default AddProductPage;
