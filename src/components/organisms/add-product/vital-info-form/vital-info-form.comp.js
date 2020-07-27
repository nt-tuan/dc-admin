import React, { forwardRef, useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";

const { Option } = Select;

export const VitalInfoForm = forwardRef(({ title }, ref) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const categoriesString = await ProductService.getProductCategories();
      setCategories(categoriesString.split(","));
      setIsLoadingCategories(false);
    });
  }, []);

  const renderFormItems = (fieldName, label) => {
    switch (fieldName) {
      case VITAL_INFO_FIELDS.productName:
        return <Input placeholder={VITAL_INFO_LABELS[VITAL_INFO_FIELDS.productName]} />;
      case VITAL_INFO_FIELDS.brand:
        return <Input placeholder={VITAL_INFO_LABELS[VITAL_INFO_FIELDS.brand]} />;
      case VITAL_INFO_FIELDS.category:
        return (
          <Select
            placeholder={VITAL_INFO_LABELS[VITAL_INFO_FIELDS.category]}
            allowClear
            loading={isLoadingCategories}
          >
            {categories.map((category) => (
              <Option value={category} key={category}>
                {category}
              </Option>
            ))}
          </Select>
        );
      case VITAL_INFO_FIELDS.keyword:
        return (
          <Select
            mode="tags"
            placeholder={VITAL_INFO_LABELS[VITAL_INFO_FIELDS.keyword]}
            style={{ width: "100%" }}
            tokenSeparators={[","]}
          ></Select>
        );
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
      colon={false}
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
        >
          {renderFormItems(name, label)}
        </Form.Item>
      ))}
    </Form>
  );
});

const VITAL_INFO_FIELDS = {
  productName: "productName",
  brand: "brand",
  category: "category",
  keyword: "keyword"
};

const VITAL_INFO_LABELS = {
  [VITAL_INFO_FIELDS.productName]: "Product Name",
  [VITAL_INFO_FIELDS.brand]: "Brand",
  [VITAL_INFO_FIELDS.category]: "Category",
  [VITAL_INFO_FIELDS.keyword]: "Keywords"
};

const SCHEMA = [
  {
    name: VITAL_INFO_FIELDS.productName,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.productName],
    rules: [{ required: true, message: "Product name is required" }]
  },
  {
    name: VITAL_INFO_FIELDS.brand,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.brand],
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
    rules: [{ required: true, message: "Please input at least 1 Keyword" }]
  }
];
