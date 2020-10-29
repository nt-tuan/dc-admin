import { Form, Select } from "antd";
import { REQUIRED_ERR } from "commons/consts";
import { TRADE_RULES_SCHEMA } from "commons/schemas";
import React, { forwardRef, memo } from "react";
import { createFormErrorComp } from "utils/form.util";

const { FIELDS, LABELS } = TRADE_RULES_SCHEMA;

const fakedCategory = [
  {
    id: 1,
    name: "Perfume"
  },
  {
    id: 2,
    name: "Phone"
  }
];

const fakedType = [
  {
    id: 1,
    name: "SamSung"
  },
  {
    id: 2,
    name: "Iphone"
  }
];

export const SelectProductForm = memo(
  forwardRef(({ initialValues, disabled }, ref) => {
    const [form] = Form.useForm();
    return (
      <Form
        ref={ref}
        name="CreateTradeRulesForm"
        form={form}
        hideRequiredMark={true}
        scrollToFirstError={true}
        labelAlign="left"
        initialValues={initialValues}
      >
        <h5 className="text-primary font-weight-bold">Select a product</h5>
        <div className="row mb-2">
          <Form.Item
            label={LABELS[FIELDS.productCategory]}
            name={FIELDS.productCategory}
            className="col-12 col-md-6"
            rules={[
              {
                required: true,
                message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.productCategory]))
              }
            ]}
          >
            <Select disabled={disabled}>
              {fakedCategory.map(({ id, name }) => (
                <Select.Option key={id} value={name}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={LABELS[FIELDS.productType]}
            name={FIELDS.productType}
            className="col-12 col-md-6"
            rules={[
              {
                required: true,
                message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.productType]))
              }
            ]}
          >
            <Select disabled={disabled}>
              {fakedType.map(({ id, name }) => (
                <Select.Option key={id} value={name}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item
            label={LABELS[FIELDS.productName]}
            name={FIELDS.productName}
            className="col-12 col-md-6"
            rules={[
              {
                required: true,
                message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.productName]))
              }
            ]}
          >
            <Select disabled={disabled}>
              {fakedCategory.map(({ id, name }) => (
                <Select.Option key={id} value={name}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    );
  })
);
