import { Button, Col, Form, Modal, Row, Select } from "antd";
import { REQUIRED_ERR } from "commons/consts";
import { REQUESTED_PRODUCTS_SCHEMA } from "commons/schemas";
import React, { memo, useCallback, useState } from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { createFormErrorComp } from "utils/form.util";

const { FIELDS, LABELS } = REQUESTED_PRODUCTS_SCHEMA;

export const AvailableProductModal = memo(({ initialValues, isVisibleModal = false, onCancel }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [productName, setProductNames] = useState([]);

  //TODO: APPLY API
  const getProductCategories = useCallback(() => {}, []);
  const getProductTypes = useCallback(() => {}, []);
  const getProductNames = useCallback(() => {}, []);

  const onSubmit = () => {
    asyncErrorHandlerWrapper(async () => {
      try {
        const result = await form.validateFields();
        console.log("onSubmit -> result", result);
      } catch (e) {}
    });
  };

  return (
    <Modal
      title="Link to an available product"
      visible={isVisibleModal}
      onCancel={onCancel}
      footer={[
        <Row>
          <Col span={11}>
            <Button onClick={onCancel} style={{ minWidth: "200px" }}>
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
          {
            if (name === FIELDS.category) {
              return (
                <Form.Item name={name} label={label} rules={rules} key={name} {...labelConfig}>
                  <Select placeholder={label}>
                    {categories.map((category) => (
                      <Select.Option value={category.id}>{category.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            }
            if (name === FIELDS.type) {
              return (
                <Form.Item name={name} label={label} rules={rules} key={name} {...labelConfig}>
                  <Select placeholder={label}>
                    {types.map((type) => (
                      <Select.Option value={type.id}>{type.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            }
            if (name === FIELDS.productName) {
              return (
                <Form.Item name={name} label={label} rules={rules} key={name} {...labelConfig}>
                  <Select placeholder={label}>
                    {productName.map((product) => (
                      <Select.Option value={product.id}>{product.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            }
          }
        })}
      </Form>
    </Modal>
  );
});

const labelConfig = {
  labelCol: { xl: 8, lg: 8, md: 8, sm: 24 },
  wrapperCol: { xl: 16, lg: 16, md: 16, sm: 24 }
};

const SCHEMA = [
  {
    name: FIELDS.category,
    label: LABELS[FIELDS.category],
    rules: [{ required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.category])) }]
  },
  {
    name: FIELDS.type,
    label: LABELS[FIELDS.type],
    rules: [
      {
        required: true,
        message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.type]))
      }
    ]
  },
  {
    name: FIELDS.productName,
    label: LABELS[FIELDS.productName],
    rules: [
      {
        required: true,
        message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.productName]))
      }
    ]
  }
];
