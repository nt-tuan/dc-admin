import React, { forwardRef } from "react";
import { Form, Input, Select, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { RegexConst } from "commons/consts";

const { Option } = Select;

export const ProductDescriptionForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} ref={ref} hideRequiredMark={true} scrollToFirstError={true} labelAlign="left">
      {schema.map(({ name, label, rules, makeRender }) => (
        <Form.Item name={name} label={label} labelCol={{ span: 4 }} rules={rules} key={name}>
          {makeRender(form)}
        </Form.Item>
      ))}
    </Form>
  );
});

const PROD_DES_FIELDS = {
  shortDes: "shortDes",
  longDes: "longDes",
  retailPrice: "retailPrice",
  gender: "gender",
  size: "size",
  type: "type"
};

const PROD_DES_LABELS = {
  [PROD_DES_FIELDS.shortDes]: "Product Description (short)",
  [PROD_DES_FIELDS.longDes]: "Product Description (long)",
  [PROD_DES_FIELDS.retailPrice]: "Retail Price",
  [PROD_DES_FIELDS.gender]: "Gender",
  [PROD_DES_FIELDS.size]: "Size",
  [PROD_DES_FIELDS.type]: "Type"
};

const genderOptions = [
  { label: "Unisex", value: "uinsex" },
  { label: "Feminine", value: "feminine" },
  { label: "Masculine", value: "masculine" }
];

const sizeOptions = [
  { label: "FL.", value: "fl" },
  { label: "OZ.", value: "oz" },
  { label: "ML", value: "ml" }
];

const currencyOptions = [
  { label: "USD", value: "usd" },
  { label: "VND", value: "vnd" }
];

const schema = [
  {
    name: PROD_DES_FIELDS.shortDes,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.shortDes],
    rules: [
      { required: true, message: "Product Description is required" },
      {
        type: "string",
        max: 255,
        message: "Short Description cannot be longer than 255 characters"
      }
    ],
    makeRender: () => <TextArea placeholder="Product description" />
  },
  {
    name: PROD_DES_FIELDS.longDes,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.longDes],
    rules: [
      { required: true, message: "Product Description is required" },
      {
        type: "string",
        max: 4000,
        message: "Long Description cannot be longer than 4000 characters"
      }
    ],
    makeRender: () => <TextArea placeholder="Product description" />
  },
  {
    name: PROD_DES_FIELDS.retailPrice,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.retailPrice],
    rules: [
      { required: true, message: "Retail Price is required" },
      {
        pattern: RegexConst.NUMBER_WITH_ONLY_2_DECIMAL_POSITIONS,
        message: "Retail price is number larger than zero with two decimal points only"
      }
    ],
    makeRender: (form) => (
      <Input
        placeholder="Retail Price"
        addonAfter={
          <Select placeholder="Choose the currency">
            {currencyOptions.map(({ label, value }) => (
              <Option value={value} key={value}>
                {label}
              </Option>
            ))}
          </Select>
        }
      />
    )
  },
  {
    name: PROD_DES_FIELDS.gender,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.gender],
    rules: [{ required: true, message: "Gender is required" }],
    makeRender: () => (
      <Radio.Group placeholder="Choose gender" allowClear>
        {genderOptions.map(({ label, value }) => (
          <Radio value={value} key={value}>
            {label}
          </Radio>
        ))}
      </Radio.Group>
    )
  },
  {
    name: PROD_DES_FIELDS.size,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.size],
    rules: [{ required: true, message: "Size is required" }],
    makeRender: () => (
      <Select placeholder="Choose size">
        {sizeOptions.map(({ label, value }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    )
  },
  {
    name: PROD_DES_FIELDS.type,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.type],
    rules: [{ required: true, message: "Type is required" }],
    makeRender: () => <Input placeholder="Type" />
  }
];
