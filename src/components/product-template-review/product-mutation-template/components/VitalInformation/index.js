import { Col, Form, Input, Row, Select } from "antd";
import {
  DUPLICATE_ITEM_VALUE,
  MAX_CHARS,
  REQUIRED_ERR,
  RegexConst,
  TEMPLATE_NAME_MAX_CHARS
} from "@/commons/consts";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ProductService } from "@/services";
import { VitalInformationAddFieldsForm } from "./vital-infor-add-field-form.comp";
import { createFormErrorComp } from "@/utils/form.util";
import debounce from "lodash/debounce";
import { getLagecyModalContainer } from "@/components/lagecy/lagecy.comp";

const INPUT_TYPE = {
  SELECT: "SELECT",
  INPUT: "INPUT",
  NUMBER: "NUMBER",
  SELECT_HSCODE_CHAR: "SELECT_HSCODE_CHAR",
  SELECT_HSCODE_NUMBER: "SELECT_HSCODE_NUMBER"
};

const { Option } = Select;

const defaultValue1 = {
  productCategory: "",
  productType: "",
  productName: "",
  hsCode: "",
  chapterLabel: "",
  headingLabel: "",
  hsCodeDescription: "",
  quantity: "",
  minimumQuantity: "",
  allowedMultiplesQuantity: ""
};

const LAYOUT = {
  labelAlign: "left",
  labelCol: { xl: 8, lg: 8, md: 24, sm: 24 },
  wrapperCol: { xl: 16, lg: 16, md: 24, sm: 24 }
};

const VitalInformationForm = ({
  form,
  formNewFields,
  categories,
  onCategoryChange,
  types,
  hsCode,
  productDetails,
  isEditing
}) => {
  const [defaultValue, setDefaultValue] = useState(defaultValue1);
  const [hsCodeData, setHsCodeData] = useState(hsCode);
  const ref = React.useRef();

  useEffect(() => {
    setHsCodeData(hsCode);
  }, [hsCode]);

  useEffect(() => {
    if (productDetails) {
      const values = {};
      productDetails.variants.forEach((variant) => {
        if (variant.name === "keyword") {
          if (!variant.value || variant.value.length === 0) {
            values[variant.name] = [];
          } else {
            values[variant.name] = variant.value?.split(",");
          }
        } else {
          values[variant.name] = variant.value;
        }
      });
      form.setFieldsValue(values);
      if (productDetails?.detail) {
        form.setFieldsValue({ customVital: JSON.parse(productDetails.detail).customVital });
      }
      setDefaultValue(values);
      onCategoryChange(values.productCategory);
    }
  }, [productDetails, form, onCategoryChange]);

  const VITAL_INFORMATION_SCHEMA = useMemo(() => {
    return [
      {
        label: "Product Category",
        name: "productCategory",
        type: INPUT_TYPE.SELECT,
        options: {
          options: categories,
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Product Category"))
            }
          ]
        },
        props: {
          disabled: !!productDetails
        }
      },
      {
        label: "Product Type",
        name: "productType",
        type: INPUT_TYPE.SELECT,
        options: {
          options: types,
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Product Type"))
            }
          ]
        },
        props: {
          disabled: !!productDetails
        }
      },
      {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        label: "Product Name",
        name: "productName",
        type: INPUT_TYPE.INPUT,
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Product Name"))
            },
            {
              type: "string",
              max: TEMPLATE_NAME_MAX_CHARS,
              message: createFormErrorComp(MAX_CHARS("Product Name", TEMPLATE_NAME_MAX_CHARS))
            },
            () => ({
              async validator(_, value) {
                if (!isEditing) {
                  const { productCategory, productType } = form.getFieldsValue([
                    "productCategory",
                    "productType"
                  ]);

                  if (value && productCategory && productType) {
                    const isValid = await ProductService.checkDuplicate({
                      name: value,
                      category: productCategory,
                      type: productType
                    });

                    if (isValid) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      createFormErrorComp(DUPLICATE_ITEM_VALUE("Product", "Name"))
                    );
                  }
                }
                return Promise.resolve();
              }
            })
          ]
        },
        props: {
          maxLength: TEMPLATE_NAME_MAX_CHARS,
          disabled: !!productDetails && isEditing
        }
      },
      {
        label: "HS Code Description",
        name: "hsCodeDescription",
        type: INPUT_TYPE.SELECT_HSCODE_CHAR,
        options: {
          options: hsCodeData?.data,
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("HS Code Description"))
            }
          ]
        },
        props: {}
      },
      {
        label: "HS Code",
        name: "hsCode",
        type: INPUT_TYPE.SELECT_HSCODE_NUMBER,
        options: {
          options: hsCodeData?.data,
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("HS Code"))
            }
          ]
        },
        props: {}
      },
      {
        label: "Chapter Label",
        name: "chapterLabel",
        type: INPUT_TYPE.INPUT,
        props: { disabled: true },
        options: {
          rules: []
        }
      },
      {
        label: "Heading Label",
        name: "headingLabel",
        type: INPUT_TYPE.INPUT,
        props: { disabled: true },
        options: {
          rules: []
        }
      },
      {
        label: "Unit of Quantity",
        name: "quantity",
        type: INPUT_TYPE.INPUT,
        props: {},
        options: {
          rules: []
        }
      },
      {
        label: "Minimum Order Quantity",
        name: "minimumQuantity",
        type: INPUT_TYPE.NUMBER,
        props: {},
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Minimum Order Quantity"))
            },
            {
              pattern: RegexConst.ONLY_INTERER_GREATER_THAN_ZERO_REGEX,
              message: createFormErrorComp("Minimum Order Quantity is integer greater then zero")
            }
          ]
        }
      },
      {
        label: "Allowed Multiples of Quantity",
        name: "allowedMultiplesQuantity",
        type: INPUT_TYPE.NUMBER,
        props: {},
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Allowed Multiples of Quantity"))
            },
            {
              pattern: RegexConst.ONLY_INTERER_GREATER_THAN_ZERO_REGEX,
              message: createFormErrorComp(
                "Allowed Multiples of Quantity is integer greater than zero"
              )
            }
          ]
        }
      },
      {
        label: "Keyword",
        name: "keyword",
        type: INPUT_TYPE.SELECT,
        mode: "tags",
        options: {
          rules: []
        },
        props: {}
      }
    ];
  }, [categories, productDetails, types, isEditing, hsCodeData.data, form]);

  const handleFieldChange = useCallback(
    (name) => {
      switch (name) {
        case "productCategory":
          return onCategoryChange;
        case "hsCode":
          return (code) => {
            const findCode = hsCodeData?.data.find((item) => item.id === code);
            if (findCode) {
              form.setFieldsValue({ hsCodeDescription: findCode.hsCodeDescription });
              form.setFieldsValue({ chapterLabel: findCode.chapterLabel });
              form.setFieldsValue({ headingLabel: findCode.headingLabel });
              // //Handling for Empty Field from BE
              form.setFieldsValue({
                quantity: findCode.unitQuantity !== undefined ? findCode.unitQuantity : ""
              });
            }
          };
        case "hsCodeDescription":
          return (code) => {
            const findCode = hsCodeData?.data.find((item) => item.hsCodeDescription === code);
            if (findCode) {
              form.setFieldsValue({ hsCode: findCode.hsCode });
              form.setFieldsValue({ chapterLabel: findCode.chapterLabel });
              form.setFieldsValue({ headingLabel: findCode.headingLabel });
              // //Handling for Empty Field from BE
              form.setFieldsValue({
                quantity: findCode.unitQuantity !== undefined ? findCode.unitQuantity : ""
              });
            }
          };
        default:
          return () => {};
      }
    },
    [onCategoryChange, form, hsCodeData]
  );

  const onSearchHSCode = debounce(async (value) => {
    if (value !== "") {
      const req = await ProductService.getAllHsCode(value);
      if (req && req?.content.length > 0) {
        const parseHsCode = req?.content.map((item) => ({
          ...item,
          id: item.hsCode,
          name: item.hsCode
        }));
        setHsCodeData({
          ...hsCodeData,
          data: [...parseHsCode],
          keyword: value
        });
      } else {
        setHsCodeData([]);
      }
    }
  }, 800);

  const onPopupScroll = debounce(async () => {
    const { keyword, page, totalPages } = hsCodeData;
    const pageR = page + 1;
    if (pageR <= totalPages) {
      const req = await ProductService.getAllHsCode(keyword, pageR);
      if (req && req?.content.length > 0) {
        // eslint-disable-next-line sonarjs/no-identical-functions
        const parseHsCode = req?.content.map((item) => ({
          ...item,
          id: item.hsCode,
          name: item.hsCode
        }));
        setHsCodeData({
          ...hsCodeData,
          data: [...hsCodeData.data, ...parseHsCode],
          parseHsCode,
          page: pageR,
          totalPages: req.totalPages
        });
      }
    }
  }, 800);

  const renderSchema = (schema) => {
    switch (schema.type) {
      case INPUT_TYPE.SELECT_HSCODE_NUMBER:
        return (
          <Select
            getPopupContainer={getLagecyModalContainer}
            showSearch
            showArrow={false}
            filterOption={false}
            notFoundContent={null}
            onSearch={onSearchHSCode}
            mode={schema.mode}
            onChange={handleFieldChange(schema.name)}
            onPopupScroll={onPopupScroll}
            {...schema.props}
          >
            {schema?.options?.options?.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {`${item.hsCode}`}
                </Option>
              );
            })}
          </Select>
        );
      case INPUT_TYPE.SELECT_HSCODE_CHAR:
        return (
          <Select
            showSearch
            getPopupContainer={getLagecyModalContainer}
            showArrow={false}
            filterOption={false}
            notFoundContent={null}
            onSearch={onSearchHSCode}
            mode={schema.mode}
            onChange={handleFieldChange(schema.name)}
            onPopupScroll={onPopupScroll}
            {...schema.props}
          >
            {schema?.options?.options?.map((item) => {
              return (
                <Option key={`name-${item.id}`} value={item.hsCodeDescription}>
                  {`${item.hsCodeDescription}`}
                </Option>
              );
            })}
          </Select>
        );
      case INPUT_TYPE.SELECT:
        return (
          <Select
            getPopupContainer={getLagecyModalContainer}
            mode={schema.mode}
            onChange={handleFieldChange(schema.name)}
            {...schema.props}
          >
            {schema?.options?.options?.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        );
      default:
        return <Input type={schema.type} {...schema.props} />;
    }
  };

  return (
    <div ref={ref}>
      <Form hideRequiredMark form={form} name="vitalInformation" {...LAYOUT}>
        <Row>
          {VITAL_INFORMATION_SCHEMA.map((schema, index) => {
            return (
              <Col span={24} md={24} sm={24} lg={24} key={index}>
                <Form.Item
                  label={schema.label}
                  name={schema.name}
                  rules={schema.options.rules}
                  initialValue={defaultValue[schema.name]}
                >
                  {renderSchema(schema)}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <VitalInformationAddFieldsForm form={formNewFields} />
      </Form>
    </div>
  );
};

export default VitalInformationForm;
