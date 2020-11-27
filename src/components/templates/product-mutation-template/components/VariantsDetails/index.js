import React, { forwardRef, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Field from "../CustomField/Field";

const VariantDetails = ({ form }) => {
  const [fields, setFields] = useState([]);
  return (
    <Form form={form}>
      <Form.List name="new-fields-item">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) => prevValues.name !== curValues.name}
                key={field.name}
              >
                {() => (
                  <Form.Item
                    {...field}
                    name={[field.name, "name"]}
                    fieldKey={[field.fieldKey, "name"]}
                    rules={[{ required: true, message: "Missing Name" }]}
                  >
                    <Field onRemove={remove} name={field.name} />
                  </Form.Item>
                )}
              </Form.Item>
            ))}
            <Form.Item className="mt-3">
              <Button
                type="primary"
                onClick={() => add()}
                style={{ minWidth: "100px" }}
                // icon={<PlusOutlined />}
              >
                New Field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default VariantDetails;
