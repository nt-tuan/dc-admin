import React, { forwardRef } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

export const VitalInfoForm = forwardRef(({ title }, ref) => {
  const [form] = Form.useForm();
  const initialInfo = {};

  const renderFormItems = (fieldName, label) => {
    switch (fieldName) {
      case VITAL_INFO_FIELDS.productName:
        return <Input placeholder="Product Name" />;
      case VITAL_INFO_FIELDS.brandName:
        return <Input placeholder="Brand name" />;
      case VITAL_INFO_FIELDS.category:
        return (
          <Select placeholder="Choose category" allowClear>
            {CategoryOptions.map(({ label, value }) => (
              <Option value={value} key={value}>
                {label}
              </Option>
            ))}
          </Select>
        );
      case VITAL_INFO_FIELDS.keyword:
        return <Input placeholder="Keyword" />;
      default:
        return null;
    }
  };

  return (
    <Form
      name="VitalInfoForm"
      form={form}
      ref={ref}
      hideRequiredMark={true}
      scrollToFirstError={true}
      labelAlign="left"
    >
      {SCHEMA.map(({ name, label, rules }) => (
        <Form.Item
          name={name}
          label={label}
          labelCol={{ sm: { span: 6 }, lg: { span: 4 } }}
          rules={rules}
          key={name}
          initialValue={initialInfo[name]}
        >
          {renderFormItems(name, label)}
        </Form.Item>
      ))}
    </Form>
  );
});

const VITAL_INFO_FIELDS = {
  productName: "productName",
  brandName: "brand",
  category: "category",
  keyword: "keyword"
};

const VITAL_INFO_LABELS = {
  [VITAL_INFO_FIELDS.productName]: "Product Name",
  [VITAL_INFO_FIELDS.brandName]: "Brand Name",
  [VITAL_INFO_FIELDS.category]: "Category",
  [VITAL_INFO_FIELDS.keyword]: "Keyword"
};

const CategoryOptions = [{ label: "Perfume", value: "Mobile Phone" }];

const SCHEMA = [
  {
    name: VITAL_INFO_FIELDS.productName,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.productName],
    rules: [{ required: true, message: "Product name is required" }]
  },
  {
    name: VITAL_INFO_FIELDS.brandName,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.brandName],
    rules: [{ required: true, message: "Brand name is required" }]
  },
  {
    name: VITAL_INFO_FIELDS.category,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.category],
    rules: [{ required: true, message: "Category is required" }]
  },
  {
    name: VITAL_INFO_FIELDS.keyword,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.keyword],
    rules: []
  }
];
