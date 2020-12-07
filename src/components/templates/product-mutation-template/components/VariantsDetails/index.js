import React, { forwardRef, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Field from "../CustomField/Field";

const VariantDetails = ({ form }) => {
  return (
    <Form form={form}>
      <Form.List name="variant-fields">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Field fieldKey={field.key} index={index} remove={() => remove(field.name)} />
            ))}
            <Form.Item className="mt-3">
              <Button
                type="primary"
                onClick={() => add()}
                style={{ minWidth: "100px" }}
                icon={<PlusOutlined />}
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
