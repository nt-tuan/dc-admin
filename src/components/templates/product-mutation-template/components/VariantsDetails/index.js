import React, { useEffect } from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import get from "lodash/get";

import Field from "../CustomField/Field";
import { EMPTY_FIELD } from "../../constants";

const VariantDetails = ({ form, productDetails }) => {
  useEffect(() => {
    if (productDetails) {
      const detail = JSON.parse(productDetails.detail);
      const { variantDetails } = detail;
      form.setFieldsValue({ variantDetails });
    }
  }, [form, productDetails]);

  const handleAddingItem = (callback) => {
    callback(EMPTY_FIELD);
  };

  return (
    <Form form={form} initialValues={{ variantDetails: [EMPTY_FIELD] }}>
      <Form.List name="variantDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              return (
                <Field
                  key={`variant-field-${field.key}`}
                  form={form}
                  field={field}
                  index={index}
                  canDelete={fields.length > 1}
                  fieldValue={get(form.getFieldsValue(), `variantDetails.[${index}]`)}
                  onRemove={() => {
                    if (fields.length === 1) return;
                    remove(index);
                  }}
                />
              );
            })}
            <Form.Item className="mt-3">
              <Button
                type="primary"
                onClick={() => handleAddingItem(add)}
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
