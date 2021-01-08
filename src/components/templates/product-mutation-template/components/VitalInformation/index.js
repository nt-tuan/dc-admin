import React, { useCallback, useMemo, useState, usecallback, useEffect } from "react";
import { createFormErrorComp } from "utils/form.util";
import { RegexConst, REQUIRED_ERR } from "commons/consts";
import { Col, Form, Input, Row, Select, InputNumber } from "antd";
import { VitalInformationAddFieldsForm } from "./vital-infor-add-field-form.comp";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";

const INPUT_TYPE = {
  SELECT: "SELECT",
  INPUT: "INPUT",
  NUMBER: "NUMBER"
};

const { Option } = Select;

const defaultValue = {
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
  setIsValidProductName
}) => {
  const [aheccCode, setAheccCode] = useState([]);
  const VITAL_INFORMATION_SCHEMA = useMemo(() => {
    let timeout;
    const checkProduct = async (name) => {
      const category = form.getFieldValue("productCategory");
      const type = form.getFieldValue("productType");
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
          maxLength: 50
        }
      },
      {
        label: "HS Code",
        name: "hsCode",
        type: INPUT_TYPE.SELECT,
        options: {
          options: hsCode,
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
      {
        label: "HS Code Description",
        name: "hsCodeDescription",
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
        type: INPUT_TYPE.NUMBER,
        props: {
          // disabled: true
        },
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Unit of Quantity"))
            }
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
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Keyword"))
            }
          ]
        }
      }
    ];
    return fields;
  }, [categories, types, hsCode]);

  const handleFieldChange = useCallback(
    (name) => {
      switch (name) {
        case "productCategory":
          return onCategoryChange;
        case "hsCode":
          return (code) => {
            asyncErrorHandlerWrapper(async () => {
              const hsDetails = await ProductService.getHsCodeDetails(code);
              form.setFieldsValue({ hsCodeDescription: hsDetails[0].hsCodeDescription });
              form.setFieldsValue({ chapterLabel: hsDetails[0].chapterLabel });
              form.setFieldsValue({ headingLabel: hsDetails[0].headingLabel });
              form.setFieldsValue({ ahecc: hsDetails[0].ahecc });
              form.setFieldsValue({ aheccFullDescription: hsDetails[0].aheccDescription });
              form.setFieldsValue({ quantity: hsDetails[0].unitQuantity });
              const aheccCode = hsDetails.map((hs) => ({
                id: hs.ahecc,
                name: hs.ahecc,
                aheccDescription: hs.aheccDescription,
                unitQuantity: hs.unitQuantity
              }));
              setAheccCode(aheccCode);
            });
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
    [onCategoryChange, form, aheccCode]
  );

  const renderSchema = useCallback(
    (schema) => {
      switch (schema.type) {
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

  console.log("Here lo there, Vital Informaiton");
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
