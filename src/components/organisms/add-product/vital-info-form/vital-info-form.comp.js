import React, { forwardRef, useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";
import { SALE_CHANNELS } from "commons/consts";

const { Option } = Select;

export const VitalInfoForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [saleChannels, setSaleChannels] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [isLoadingSaleChannels, setIsLoadingSaleChannels] = useState(true);
  const category = form.getFieldValue(VITAL_INFO_FIELDS.category);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const categoriesString = await ProductService.getProductCategories();
      setCategories(categoriesString);
      setIsLoadingCategories(false);
    });
  }, []);

  useEffect(() => {
    setIsLoadingTypes(true);
    asyncErrorHandlerWrapper(async () => {
      const types = await ProductService.getProductTypes(category);
      setTypes(types);
      setIsLoadingTypes(false);
    });
  }, [category]);

  const handleCategoryChange = (category) => {
    setIsLoadingTypes(true);
    asyncErrorHandlerWrapper(async () => {
      const types = await ProductService.getProductTypes(category);
      setTypes(types);
      setIsLoadingTypes(false);
    });
  };

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const saleChannels = await ProductService.getProductSaleChannels();
      setSaleChannels(saleChannels);
      setIsLoadingSaleChannels(false);
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
            disabled={isLoadingCategories}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <Option value={category} key={category}>
                {category}
              </Option>
            ))}
          </Select>
        );
      case VITAL_INFO_FIELDS.type:
        return (
          <Select
            placeholder={VITAL_INFO_LABELS[VITAL_INFO_FIELDS.type]}
            allowClear
            loading={isLoadingTypes}
            disabled={isLoadingTypes}
          >
            {types.map((type) => (
              <Option value={type} key={type}>
                {type}
              </Option>
            ))}
          </Select>
        );
      case VITAL_INFO_FIELDS.saleChannel:
        return (
          <Select
            placeholder={VITAL_INFO_LABELS[VITAL_INFO_FIELDS.saleChannel]}
            allowClear
            loading={isLoadingSaleChannels}
            disabled={isLoadingSaleChannels}
          >
            {saleChannels.map((channel) => (
              <Option value={channel} key={channel}>
                {SALE_CHANNELS[channel]}
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
      {SCHEMA.map(({ name, label, rules, dependencies }) => (
        <Form.Item
          name={name}
          label={label}
          labelCol={{ sm: { span: 6 }, lg: { span: 4 } }}
          rules={rules}
          key={name}
          dependencies={dependencies}
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
  keyword: "keyword",
  type: "type",
  saleChannel: "salesChannel"
};

const VITAL_INFO_LABELS = {
  [VITAL_INFO_FIELDS.productName]: "Product Name",
  [VITAL_INFO_FIELDS.brand]: "Brand",
  [VITAL_INFO_FIELDS.category]: "Category",
  [VITAL_INFO_FIELDS.keyword]: "Keywords",
  [VITAL_INFO_FIELDS.type]: "Type",
  [VITAL_INFO_FIELDS.saleChannel]: "Sales Channels"
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
    name: VITAL_INFO_FIELDS.type,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.type],
    rules: [{ required: true, message: "Type is required" }],
    dependencies: [VITAL_INFO_FIELDS.category]
  },
  {
    name: VITAL_INFO_FIELDS.saleChannel,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.saleChannel],
    rules: [{ required: true, message: "Category is required" }]
  },
  {
    name: VITAL_INFO_FIELDS.keyword,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.keyword],
    rules: [{ required: true, message: "Please input at least 1 Keyword" }]
  }
];
