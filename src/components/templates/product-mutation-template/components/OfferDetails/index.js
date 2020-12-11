import React from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Field from "../CustomField/Field";

const VariantDetails = ({ form }) => {
  return (
    <Form
      form={form}
      initialValues={{
        offerDetails: [
          {
            fieldName: "",
            type: "",
            fieldOption: [""]
          }
        ]
      }}
    >
      <Form.List name="offerDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Field
                field={field}
                fieldKey={field.key}
                index={index}
                remove={() => {
                  if (fields.length === 1) return;
                  remove(field.name);
                }}
              />
            ))}
            <Form.Item className="mt-3">
              <Button
                type="primary"
                onClick={() =>
                  add({
                    fieldName: "",
                    type: "",
                    fieldOption: [""]
                  })
                }
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
