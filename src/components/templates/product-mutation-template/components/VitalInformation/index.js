import React, { useCallback, useMemo, useState, usecallback, useEffect } from "react";
import { createFormErrorComp } from "utils/form.util";
import { RegexConst, REQUIRED_ERR } from "commons/consts";
import { Col, Form, Input, Row, Select, InputNumber, Spin } from "antd";
import { VitalInformationAddFieldsForm } from "./vital-infor-add-field-form.comp";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";
import debounce from "lodash/debounce";

const INPUT_TYPE = {
  SELECT: "SELECT",
  INPUT: "INPUT",
  NUMBER: "NUMBER"
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
  aheccCode: "",
  aheccFullDescription: "",
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
  setIsValidProductName,
  productDetails
}) => {
  const [aheccCode, setAheccCode] = useState([]);
  const [defaultValue, setDefaultValue] = useState(defaultValue1);

  const [hsCodeData, setHsCodeData] = useState(hsCode);

  useEffect(() => {
    setHsCodeData(hsCode);
  }, [hsCode]);

  useEffect(() => {
    if (productDetails) {
      const values = {};
      productDetails.variants.forEach((variant) => {
        if (variant.name == "keyword" && variant.value) {
          values[variant.name] = variant.value.split(",");
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
    let timeout;

    const checkProduct = async (name) => {
      const category = form.getFieldValue("productCategory");
      const type = form.getFieldValue("productType");

      if (name.length > 50) {
        form.setFields([
          {
            name: "productName",
            errors: ["The product name can not exceed 50 characters"]
          }
        ]);
      }

      if (category && type) {
        const isValidName = await ProductService.checkDuplicate({
          name,
          category,
          type
        });
        setIsValidProductName(isValidName);
        if (!isValidName) {
          form.setFields([
            {
              name: "productName",
              errors: ["This product has already been created"]
            }
          ]);
        }
      }
    };

    const handleChangeName = (value) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => checkProduct(value), 500);
    };

    const fields = [
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
        }
      },
      {
        label: "Product Name",
        name: "productName",
        type: INPUT_TYPE.INPUT,
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Product Name"))
            }
          ]
        },
        props: {
          onChange: (e) => handleChangeName(e.target.value),
          maxLength: 51,
          disabled: !!productDetails
        }
      },

      {
        label: "HS Code Description",
        name: "hsCodeDescription",
        type: INPUT_TYPE.INPUT,
        props: { disabled: true },
        options: {
          rules: []
        }
      },
      {
        label: "HS Code",
        name: "hsCode",
        type: INPUT_TYPE.SELECT_HSCODE,
        options: {
          options: hsCodeData?.data,
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("HS Code"))
            }
          ]
        }
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

      // Note: remove AHECC, AHECC Full Description field and do not disable Unit of Quantity field for hsb2b
      // {
      //   label: "AHECC",
      //   name: "ahecc",
      //   type: INPUT_TYPE.SELECT,
      //   options: {
      //     options: aheccCode,
      //     rules: [
      //       {
      //         required: true,
      //         message: createFormErrorComp(REQUIRED_ERR("AHECC"))
      //       }
      //     ]
      //   }
      // },
      // {
      //   label: "AHECC Full Description",
      //   name: "aheccFullDescription",
      //   type: INPUT_TYPE.SELECT,
      //   options: {
      //     options: aheccCode.map((code) => ({
      //       id: code.aheccDescription,
      //       name: code.aheccDescription
      //     })),
      //     rules: [
      //       {
      //         required: true,
      //         message: createFormErrorComp(REQUIRED_ERR("AHECC Full Description"))
      //       }
      //     ]
      //   }
      // },
      {
        label: "Unit of Quantity",
        name: "quantity",
        type: INPUT_TYPE.INPUT,
        props: {
          disabled: false
        },
        options: {
          rules: [
            //Remove as no long requried field
            // {
            //   required: true,
            //   message: createFormErrorComp(REQUIRED_ERR("Unit of Quantity"))
            // }
          ]
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
        }
      }
    ];
    return fields;
  }, [categories, types, hsCodeData, form, setIsValidProductName]);

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
              form.setFieldsValue({ ahecc: findCode.ahecc });
              form.setFieldsValue({ aheccFullDescription: findCode.aheccDescription });
              // //Handling for Empty Field from BE
              form.setFieldsValue({
                quantity: findCode.unitQuantity !== undefined ? findCode.unitQuantity : ""
              });
            }
          };
        case "ahecc":
          return (selectedCode) => {
            const selectedAheccCode = aheccCode.find((code) => code.id === selectedCode);
            form.setFieldsValue({ aheccFullDescription: selectedAheccCode?.selectedAheccCode });
            form.setFieldsValue({ quantity: selectedAheccCode?.unitQuantity });
          };
        case "aheccFullDescription":
          return (aheccDes) => {
            const selectedAheccCode = aheccCode.find((code) => code.aheccDescription === aheccDes);
            form.setFieldsValue({ ahecc: selectedAheccCode?.id });
          };
        default:
          return () => {};
      }
    },
    [onCategoryChange, form, aheccCode, hsCodeData]
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
          data: [...hsCodeData.data, parseHsCode],
          keyword: value
        });
      } else {
        setHsCodeData([]);
      }
    }
  }, 800);
  console.log(hsCodeData);

  const onPopupScroll = debounce(async (value) => {
    const { keyword, page, totalPages } = hsCodeData;
    const pageR = page + 1;
    console.log(pageR, totalPages);
    if (pageR <= totalPages) {
      const req = await ProductService.getAllHsCode(keyword, pageR);
      if (req && req?.content.length > 0 && pageR !== req.number) {
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

  const renderSchema = useCallback(
    (schema) => {
      switch (schema.type) {
        case INPUT_TYPE.SELECT_HSCODE:
          return (
            <Select
              showSearch
              showArrow={false}
              filterOption={false}
              notFoundContent={null}
              onSearch={onSearchHSCode}
              mode={schema.mode}
              onChange={handleFieldChange(schema.name)}
              onPopupScroll={onPopupScroll}
            >
              {schema?.options?.options?.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {`${item.hsCode} - ${item.hsCodeDescription}`}
                  </Option>
                );
              })}
            </Select>
          );
        case INPUT_TYPE.SELECT:
          return (
            <Select mode={schema.mode} onChange={handleFieldChange(schema.name)}>
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
    },
    [handleFieldChange]
  );

  return (
    <>
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
    </>
  );
};

export default VitalInformationForm;
