import { Button, Col, Form, Modal, Row, Select } from "antd";
import { REQUIRED_ERR } from "commons/consts";
import { REQUESTED_PRODUCTS_SCHEMA } from "commons/schemas";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ProductService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { createFormErrorComp } from "utils/form.util";

const { FIELDS, LABELS } = REQUESTED_PRODUCTS_SCHEMA;

export const AvailableProductModal = memo(
  ({ initialValues, isVisibleModal = false, onCancel, onSubmitSuccess }) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [productName, setProductNames] = useState([]);

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
      getProductCategories();
    }, [getProductCategories]);

    useEffect(() => {
      if (initialValues) {
        getProductTypes(initialValues[FIELDS.categoryId]);
        getProductNames(initialValues[FIELDS.typeId]);
      }
    }, [initialValues, getProductTypes, getProductNames]);

    const onSubmit = () => {
      asyncErrorHandlerWrapper(async () => {
        try {
          const result = await form.validateFields();
          await ProductService.addAvailableProduct(result.id, initialValues[FIELDS.id]);
          onSubmitSuccess();
        } catch (e) {}
      });
    };

    return (
      <Modal
        title="Link to an available product"
        visible={isVisibleModal}
        onCancel={() => {
          form.resetFields([FIELDS.categoryId, FIELDS.typeId, FIELDS.id]);
          onCancel();
        }}
        footer={[
          <Row key="available-product">
            <Col span={11}>
              <Button
                onClick={() => {
                  form.resetFields([FIELDS.categoryId, FIELDS.typeId, FIELDS.id]);
                  onCancel();
                }}
                style={{ minWidth: "200px" }}
              >
                Back
              </Button>
            </Col>
            <Col span={11}>
              <Button
                htmlType="submit"
                type="primary"
                style={{ minWidth: "200px" }}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
        ]}
      >
        <p className="text-center">Link the request with a product in the database</p>
        <Form labelAlign="left" form={form} initialValues={initialValues}>
          {SCHEMA.map(({ name, label, rules }) => {
            if (name === FIELDS.categoryId) {
              return (
                <Form.Item name={name} label={label} rules={rules} key={name} {...labelConfig}>
                  <Select
                    placeholder={label}
                    onChange={(value) => {
                      form.setFieldsValue({ [FIELDS.typeId]: undefined, [FIELDS.id]: undefined });
                      getProductTypes(value);
                    }}
                  >
                    {categories.map((category) => (
                      <Select.Option value={category.id} key={category.id}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            }
            if (name === FIELDS.typeId) {
              return (
                <Form.Item name={name} label={label} rules={rules} key={name} {...labelConfig}>
                  <Select
                    placeholder={label}
                    onChange={(value) => {
                      form.setFieldsValue({ [FIELDS.id]: undefined });
                      getProductTypes(value);
                    }}
                  >
                    {types.map((type) => (
                      <Select.Option value={type.id} key={type.id}>
                        {type.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            }
            if (name === FIELDS.id) {
              return (
                <Form.Item name={name} label={label} rules={rules} key={name} {...labelConfig}>
                  <Select placeholder={label}>
                    {productName.map((product) => (
                      <Select.Option key={product.name} value={product.id}>
                        {product.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            }
            return null;
          })}
        </Form>
      </Modal>
    );
  }
);

const labelConfig = {
  labelCol: { xl: 8, lg: 8, md: 8, sm: 24 },
  wrapperCol: { xl: 16, lg: 16, md: 16, sm: 24 }
};

const SCHEMA = [
  {
    name: FIELDS.categoryId,
    label: LABELS[FIELDS.category],
    rules: [{ required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.category])) }]
  },
  {
    name: FIELDS.typeId,
    label: LABELS[FIELDS.type],
    rules: [
      {
        required: true,
        message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.type]))
      }
    ]
  },
  {
    name: FIELDS.id,
    label: LABELS[FIELDS.productName],
    rules: [
      {
        required: true,
        message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.productName]))
      }
    ]
  }
];
