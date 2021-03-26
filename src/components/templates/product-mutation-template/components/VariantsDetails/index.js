import React, { useEffect, useCallback, useState } from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import get from "lodash/get";

import Field from "../CustomField/Field";
import { EMPTY_FIELD } from "../../constants";

const VariantDetails = ({ form, productDetails, isEditing = false }) => {
  const [emptyForm, setEmptyForm] = useState(false);

  useEffect(() => {
    if (productDetails) {
      const detail = JSON.parse(productDetails.detail);
      const { variantDetails } = detail;
      if (variantDetails) {
        form.setFieldsValue({ variantDetails });
      } else {
        setEmptyForm(true);
      }
    }
  }, [form, productDetails]);

  const handleAddingItem = (callback) => {
    callback(EMPTY_FIELD);
  };

  const handleValuesChange = useCallback(
    (recentlyChangedValues) => {
      if (recentlyChangedValues.variantDetails.length === 0) {
        form.setFieldsValue({ variantDetails: [EMPTY_FIELD] });
        setEmptyForm(true);
      } else {
        setEmptyForm(false);
      }
    },
    [form]
  );

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      initialValues={{ variantDetails: [EMPTY_FIELD] }}
    >
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
                  canDelete={(isEditing && !emptyForm) || fields.length > 1}
                  fieldValue={get(form.getFieldsValue(), `variantDetails.[${index}]`)}
                  onRemove={() => remove(index)}
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
