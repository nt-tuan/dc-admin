import React, { forwardRef } from "react";
import { Form, Input, Select, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { RegexConst } from "commons/consts";

const { Option } = Select;

export const ProductDescriptionForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  const renderFormItems = (fieldName) => {
    switch (fieldName) {
      case PROD_DES_FIELDS.shortDes:
        return <TextArea placeholder="Product description (short)" />;
      case PROD_DES_FIELDS.longDes:
        return <TextArea placeholder="Product description (long)" />;
      case PROD_DES_FIELDS.retailPrice:
        return (
          <Input
            placeholder="Retail Price"
            addonAfter={
              <Form.Item
                noStyle
                initialValue={currencyOptions[0].value}
                name={PROD_DES_FIELDS.currency}
                key={name}
              >
                <Select style={{ width: 100 }}>
                  {currencyOptions.map(({ label, value }) => (
                    <Option value={value} key={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            }
          />
        );
      case PROD_DES_FIELDS.gender:
        return (
          <Radio.Group placeholder="Choose gender" allowClear>
            {genderOptions.map(({ label, value }) => (
              <Radio value={value} key={value}>
                {label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case PROD_DES_FIELDS.size:
        return (
          <Input
            placeholder="Size"
            addonAfter={
              <Form.Item
                noStyle
                initialValue={sizeOptions[0].value}
                name={PROD_DES_FIELDS.sizeMeasurement}
                key={name}
              >
                <Select style={{ width: 100 }}>
                  {sizeOptions.map(({ label, value }) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            }
          />
        );
      case PROD_DES_FIELDS.type:
        return <Input placeholder="Type" />;
      default:
        return null;
    }
  };

  return (
    <Form
      name="ProductDescriptionForm"
      form={form}
      ref={ref}
      colon={false}
      hideRequiredMark={true}
      scrollToFirstError={true}
      labelAlign="left"
    >
      {schema.map(({ name, label, rules, defaultValue }) => (
        <Form.Item
          name={name}
          label={label}
          labelCol={{ sm: { span: 8 }, md: { span: 8 }, lg: { span: 6 } }}
          rules={rules}
          key={name}
          initialValue={defaultValue}
        >
          {renderFormItems(name)}
        </Form.Item>
      ))}
    </Form>
  );
});

const PROD_DES_FIELDS = {
  shortDes: "Short Description",
  longDes: "Long Description",
  retailPrice: "Retail Price",
  gender: "Gender",
  size: "Size",
  sizeMeasurement: "Size Mesurement",
  type: "Type",
  currency: "Currency"
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
  { label: "Unisex", value: "UNISEX" },
  { label: "Feminine", value: "FEMININE" },
  { label: "Masculine", value: "MASCULINE" }
];

const sizeOptions = [
  { label: "FL.", value: "FL" },
  { label: "OZ.", value: "OZ" },
  { label: "ML", value: "ML" }
];

const currencyOptions = [{ label: "USD", value: "USD" }];

const schema = [
  {
    name: PROD_DES_FIELDS.shortDes,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.shortDes],
    defaultValue: "",
    rules: [
      { required: true, message: "Product Description is required" },
      {
        type: "string",
        max: 255,
        message: "Short Description cannot be longer than 255 characters"
      }
    ]
  },
  {
    name: PROD_DES_FIELDS.longDes,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.longDes],
    defaultValue: "",
    rules: [
      { required: true, message: "Product Description is required" },
      {
        type: "string",
        max: 4000,
        message: "Long Description cannot be longer than 4000 characters"
      }
    ]
  },
  {
    name: PROD_DES_FIELDS.retailPrice,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.retailPrice],
    defaultValue: null,
    rules: [
      { required: true, message: "Retail Price is required" },
      {
        pattern: RegexConst.NUMBER_WITH_ONLY_2_DECIMAL_POSITIONS,
        message: "Retail price is number larger than zero with two decimal points only"
      }
    ]
  },
  {
    name: PROD_DES_FIELDS.gender,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.gender],
    defaultValue: genderOptions[0].value,
    rules: [{ required: true, message: "Gender is required" }]
  },
  {
    name: PROD_DES_FIELDS.size,
    defaultValue: null,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.size],
    rules: [{ required: true, message: "Size is required" }]
  },
  {
    name: PROD_DES_FIELDS.type,
    defaultValue: null,
    label: PROD_DES_LABELS[PROD_DES_FIELDS.type],
    rules: [{ required: true, message: "Type is required" }]
  }
];
