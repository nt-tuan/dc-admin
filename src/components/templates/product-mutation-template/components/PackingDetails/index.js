import React, { useEffect, useCallback } from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import get from "lodash/get";

import Field from "../CustomField/Field";
import { EMPTY_FIELD } from "../../constants";

const PackingDetails = ({ form, onValuesChange, productDetails }) => {
  useEffect(() => {
    if (productDetails) {
      const detail = JSON.parse(productDetails.detail);
      const { packingDetails } = detail;
      if (packingDetails) {
        form.setFieldsValue({ packingDetails });
      } else {
        form.setFieldsValue({ packingDetails: [EMPTY_FIELD] });
      }
    }
  }, [productDetails, form]);

  const handleAddingItem = (callback) => {
    callback(EMPTY_FIELD);
  };

  const handleValuesChange = useCallback(
    (recentlyChangedValues) => {
      let isEmpty = false;
      if (recentlyChangedValues.packingDetails.length === 0) {
        form.setFieldsValue({ packingDetails: [EMPTY_FIELD] });
        isEmpty = true;
      } else {
        isEmpty = true;
      }
      onValuesChange(recentlyChangedValues, { empty: isEmpty });
    },
    [form, onValuesChange]
  );

  return (
    <Form
      form={form}
      initialValues={{
        packingDetails: [EMPTY_FIELD]
      }}
      onValuesChange={handleValuesChange}
    >
      <Form.List name="packingDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Field
                key={`packing-field-${field.key}`}
                form={form}
                field={field}
                index={index}
                canDelete
                fieldValue={get(form.getFieldsValue(), `packingDetails.[${index}]`)}
                onRemove={() => remove(index)}
              />
            ))}
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

export default PackingDetails;
