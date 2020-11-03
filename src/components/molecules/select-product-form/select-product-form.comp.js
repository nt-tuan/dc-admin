import { Form, Select } from "antd";
import { REQUIRED_ERR } from "commons/consts";
import { TRADE_RULES_SCHEMA } from "commons/schemas";
import React, { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { ProductService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { createFormErrorComp } from "utils/form.util";

const { FIELDS, LABELS } = TRADE_RULES_SCHEMA;

export const SelectProductForm = memo(
  forwardRef(({ initialValues, disabled }, ref) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [productNames, setProductNames] = useState([]);

    const getProductCategories = useCallback(() => {
      asyncErrorHandlerWrapper(async () => {
        const result = await ProductService.getProductCategories();
        setCategories(result);
      });
    }, []);

    const getProductTypes = useCallback((categoryId) => {
      asyncErrorHandlerWrapper(async () => {
        const result = await ProductService.getProductTypes(categoryId);
        setTypes(result);
      });
    }, []);

    const getProductNames = useCallback((typeId) => {
      asyncErrorHandlerWrapper(async () => {
        const result = await ProductService.getProductNameByTypeId(typeId);
        setProductNames(result);
      });
    }, []);

    useEffect(() => {
      if (initialValues) form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    useEffect(() => {
      getProductCategories();
    }, [getProductCategories]);

    return (
      <Form
        ref={ref}
        name="CreateTradeRulesForm"
        form={form}
        hideRequiredMark={true}
        scrollToFirstError={true}
        labelAlign="left"
      >
        <h5 className="text-primary font-weight-bold">Select a product</h5>
        <div className="row mb-2">
          <Form.Item
            label={LABELS[FIELDS.category]}
            name={FIELDS.category}
            className="col-12 col-md-6"
            rules={[
              {
                required: true,
                message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.category]))
              }
            ]}
          >
            <Select
              disabled={disabled}
              onChange={(value) => {
                getProductTypes(value);
                form.resetFields([FIELDS.type, FIELDS.productName]);
              }}
            >
              {categories.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={LABELS[FIELDS.type]}
            name={FIELDS.type}
            className="col-12 col-md-6"
            rules={[
              {
                required: true,
                message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.type]))
              }
            ]}
          >
            <Select
              disabled={disabled}
              onChange={(value) => {
                getProductNames(value);
                form.resetFields([FIELDS.productName]);
              }}
            >
              {types.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
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
              {productNames.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
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
