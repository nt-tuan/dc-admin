import React, { forwardRef } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

export const VitalInfoForm = forwardRef(({ title }, ref) => {
  const [form] = Form.useForm();
  const initialInfo = localStorage.getItem("productData")
    ? JSON.parse(localStorage.getItem("productData"))[0]
    : {};

  return (
    <Form form={form} ref={ref} hideRequiredMark={true} scrollToFirstError={true} labelAlign="left">
      {schema.map(({ name, label, rules, makeRender }) => (
        <Form.Item
          name={name}
          label={label}
          labelCol={{ sm: { span: 6 }, lg: { span: 4 } }}
          rules={rules}
          key={name}
          initialValue={initialInfo[name]}
        >
          {makeRender()}
        </Form.Item>
      ))}
    </Form>
  );
});

const VITAL_INFO_FIELDS = {
  productName: "productName",
  brandName: "brandName",
  category: "category",
  keyWord: "keyWord"
};

const VITAL_INFO_LABELS = {
  [VITAL_INFO_FIELDS.productName]: "Product Name",
  [VITAL_INFO_FIELDS.brandName]: "Brand Name",
  [VITAL_INFO_FIELDS.category]: "Category",
  [VITAL_INFO_FIELDS.keyWord]: "Keyword"
};

const options = [
  { label: "Own Brands", value: "ownBrands" },
  { label: "Niche Brands", value: "nicheBrands" },
  { label: "Wholesale Brands", value: "wholesaleBrands" },
  { label: "Wholesale Mass", value: "wholesaleMass" }
];

const schema = [
  {
    name: VITAL_INFO_FIELDS.productName,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.productName],
    rules: [{ required: true, message: "Product name is required" }],
    makeRender: () => <Input placeholder="Product Name" />
  },
  {
    name: VITAL_INFO_FIELDS.brandName,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.brandName],
    rules: [{ required: true, message: "Brand name is required" }],
    makeRender: () => <Input placeholder="Brand name" />
  },
  {
    name: VITAL_INFO_FIELDS.category,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.category],
    rules: [{ required: true, message: "Category is required" }],
    makeRender: () => (
      <Select placeholder="Choose category" allowClear>
        {options.map(({ label, value }) => (
          <Option value={value} key={value}>
            {label}
          </Option>
        ))}
      </Select>
    )
  },
  {
    name: VITAL_INFO_FIELDS.keyWord,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.keyWord],
    rules: [],
    makeRender: () => <Input placeholder="Keyword" />
  }
];
