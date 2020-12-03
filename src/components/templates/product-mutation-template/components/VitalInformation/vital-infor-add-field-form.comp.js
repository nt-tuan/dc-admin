import { Form, Input, Button, Row, Col } from "antd";
import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24
  }
};

export const VitalInformationAddFieldsForm = ({ form }) => {
  return (
    <Form.List name="customVital">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Row key={index} gutter={16} className="align-items-center mb-3">
              <Col sm={24} md={24} lg={8} xl={8}>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) => prevValues.name !== curValues.name}
                >
                  {() => (
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[{ required: true, message: "Missing Name" }]}
                    >
                      <Input placeholder="Enter field name" className="w-100" />
                    </Form.Item>
                  )}
                </Form.Item>
              </Col>
              <Col sm={20} md={22} lg={14} xl={14} className="px-0">
                <Form.Item
                  {...field}
                  name={[field.name, "value"]}
                  fieldKey={[field.fieldKey, "value"]}
                  rules={[{ required: true, message: "Missing Value" }]}
                >
                  <Input placeholder="Enter field value" className="w-100" />
                </Form.Item>
              </Col>
              <Col span={2} sm={24} md={2} lg={2} xl={2}>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Col>
            </Row>
          ))}
          <Form.Item className="mt-3">
            <Button
              type="primary"
              onClick={() => add()}
              style={{ minWidth: "100px" }}
              icon={<PlusOutlined />}
            >
              Add another vital information
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
