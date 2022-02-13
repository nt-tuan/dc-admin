import { Col, Form, Input, Row, Select } from "antd";
import React, { useCallback, useMemo } from "react";

import { REQUIRED_ERR } from "commons/consts";
import { VitalInformationAddFieldsForm } from "./vital-infor-add-field-form.comp";
import { createFormErrorComp } from "utils/form.util";
import { getLagecyModalContainer } from "components/lagecy/lagecy.comp";

const INPUT_TYPE = {
  SELECT: "SELECT",
  INPUT: "INPUT"
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
  allowedMultiplesQuantity: "",
  keyword: ""
};

const LAYOUT = {
  labelAlign: "left",
  labelCol: { xl: 8, lg: 8, md: 24, sm: 24 },
  wrapperCol: { xl: 16, lg: 16, md: 24, sm: 24 }
};

export const VitalInformationForm = ({ form, formNewFields }) => {
  const VITAL_INFORMATION_SCHEMA = useMemo(() => {
    const fields = [
      {
        label: "Product Category",
        name: "productCategory",
        type: INPUT_TYPE.SELECT,
        options: {
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
        }
      },
      {
        label: "HS Code",
        name: "hsCode",
        type: INPUT_TYPE.SELECT,
        options: {
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
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Chapter Label"))
            }
          ]
        }
      },
      {
        label: "Heading Label",
        name: "headingLabel",
        type: INPUT_TYPE.INPUT,
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Heading Label"))
            }
          ]
        }
      },
      {
        label: "HS Code Description",
        name: "hsCodeDescription",
        type: INPUT_TYPE.INPUT,
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("HS Code Description"))
            }
          ]
        }
      },
      {
        label: "AHECC",
        name: "ahecc",
        type: INPUT_TYPE.SELECT,
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("AHECC"))
            }
          ]
        }
      },
      {
        label: "AHECC Full Description",
        name: "aheccFullDescription",
        type: INPUT_TYPE.SELECT,
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("AHECC Full Description"))
            }
          ]
        }
      },
      {
        label: "Unit of Quantity",
        name: "quantity",
        type: INPUT_TYPE.INPUT,
        props: {
          addonAfter: "KG"
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
        type: INPUT_TYPE.INPUT,
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Minimum Order Quantity"))
            }
          ]
        }
      },
      {
        label: "Allowed Multiples of Quantity",
        name: "allowedMultiplesQuantity",
        type: INPUT_TYPE.INPUT,
        options: {
          rules: [
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("Allowed Multiples of Quantity"))
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
  }, []);

  const renderSchema = useCallback((schema) => {
    switch (schema.type) {
      case INPUT_TYPE.SELECT:
        return (
          <Select getPopupContainer={getLagecyModalContainer} model={schema.mode}>
            {schema?.options?.options?.map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        );
      default:
        return <Input {...schema.props} />;
    }
  }, []);

  return (
    <>
      <Form hideRequiredMark form={form} {...LAYOUT}>
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
      </Form>
      <VitalInformationAddFieldsForm form={formNewFields} />
    </>
  );
};
