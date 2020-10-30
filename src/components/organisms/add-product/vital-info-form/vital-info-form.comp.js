import React, { forwardRef, useState, useEffect, useCallback } from "react";
import { Form, Input, Select } from "antd";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";
// import { SALE_CHANNELS } from "commons/consts";

const { Option } = Select;

export const VitalInfoForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  // const [isLoadingSaleChannels, setIsLoadingSaleChannels] = useState(true);
  // const [saleChannels, setSaleChannels] = useState([]);
  const category = form.getFieldValue(VITAL_INFO_FIELDS.category);

  const getCategories = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const categoriesString = await ProductService.getProductCategories();
      setCategories(categoriesString);
      setIsLoadingCategories(false);
    });
  }, []);

  const getTypes = useCallback((categoryId) => {
    setIsLoadingTypes(true);
    asyncErrorHandlerWrapper(async () => {
      const types = await ProductService.getProductTypes(categoryId);
      setTypes(types);
      setIsLoadingTypes(false);
    });
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (category) {
      getTypes(category);
    }
  }, [getTypes, category]);

  // const getSaleChannels = useCallback(() => {
  //   asyncErrorHandlerWrapper(async () => {
  //     const saleChannels = await ProductService.getProductSaleChannels();
  //     setSaleChannels(saleChannels);
  //     setIsLoadingSaleChannels(false);
  //   });
  // }, []);

  // useEffect(() => {
  //   getSaleChannels();
  // }, [getSaleChannels]);

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
            onChange={getTypes}
          >
            {categories.map((category) => (
              <Option value={category.id} key={category.id}>
                {category.name}
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
            {types.map(({ id, name }) => (
              <Option value={id} key={id}>
                {name}
              </Option>
            ))}
          </Select>
        );
      // case VITAL_INFO_FIELDS.saleChannel:
      //   return (
      //     <Select
      //       placeholder={VITAL_INFO_LABELS[VITAL_INFO_FIELDS.saleChannel]}
      //       allowClear
      //       loading={isLoadingSaleChannels}
      //       disabled={isLoadingSaleChannels}
      //     >
      //       {saleChannels.map((channel) => (
      //         <Option value={channel} key={channel}>
      //           {SALE_CHANNELS[channel]}
      //         </Option>
      //       ))}
      //     </Select>
      //   );
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
      {SCHEMA.map(({ name, label, rules, dependencies, title }) => (
        <div title={title} key={name}>
          <Form.Item
            name={name}
            label={<div title={title}>{label}</div>}
            labelCol={{ sm: { span: 6 }, lg: { span: 4 } }}
            rules={rules}
            dependencies={dependencies}
          >
            {renderFormItems(name, label)}
          </Form.Item>
        </div>
      ))}
    </Form>
  );
});

const VITAL_INFO_FIELDS = {
  productName: "productName",
  brand: "brand",
  category: "categoryId",
  keyword: "keyword",
  type: "typeId"
  // saleChannel: "salesChannel"
};

const VITAL_INFO_LABELS = {
  [VITAL_INFO_FIELDS.productName]: "Product Name",
  [VITAL_INFO_FIELDS.brand]: "Product Brand",
  [VITAL_INFO_FIELDS.category]: "Product Category",
  [VITAL_INFO_FIELDS.keyword]: "Keywords",
  [VITAL_INFO_FIELDS.type]: "Type"
  // [VITAL_INFO_FIELDS.saleChannel]: "Sales Channels"
};

const SCHEMA = [
  {
    name: VITAL_INFO_FIELDS.productName,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.productName],
    rules: [{ required: true, message: "Product name is required" }],
    title:
      "A short title for the product. This will be displayed in bold on the product page and in the title bar of the Marketplace window"
  },
  {
    name: VITAL_INFO_FIELDS.brand,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.brand],
    rules: [{ required: true, message: "Brand name is required" }],
    title: "The brand of the product"
  },
  {
    name: VITAL_INFO_FIELDS.category,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.category],
    rules: [{ required: true, message: "Category is required" }],
    title: "The category of the product"
  },
  {
    name: VITAL_INFO_FIELDS.type,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.type],
    rules: [{ required: true, message: "Type is required" }],
    dependencies: [VITAL_INFO_FIELDS.category]
  },
  // {
  //   name: VITAL_INFO_FIELDS.saleChannel,
  //   label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.saleChannel],
  //   rules: [{ required: true, message: "Category is required" }]
  // },
  {
    name: VITAL_INFO_FIELDS.keyword,
    label: VITAL_INFO_LABELS[VITAL_INFO_FIELDS.keyword],
    rules: [{ required: true, message: "Please input at least 1 Keyword" }],
    title: "Search terms that describe your product: no repetition, no competitor brand names"
  }
];
