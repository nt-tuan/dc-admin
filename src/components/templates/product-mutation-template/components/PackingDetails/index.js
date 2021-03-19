import React, { useEffect, useCallback, useState } from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import get from "lodash/get";
import { equalFields } from "utils/form.util";

import Field from "../CustomField/Field";
import { EMPTY_FIELD } from "../../constants";

const PackingDetails = ({ form, onValuesChange, productDetails, isEditing = false }) => {
  const [emptyForm, setEmptyForm] = useState(false);

  useEffect(() => {
    if (productDetails) {
      const detail = JSON.parse(productDetails.detail);
      const { packingDetails } = detail;
      if (packingDetails) {
        form.setFieldsValue({ packingDetails });
      } else {
        setEmptyForm(true);
      }
    }
  }, [productDetails, form]);

  const handleAddingItem = (callback) => {
    callback(EMPTY_FIELD);
  };

  const handleValuesChange = useCallback(
    (recentlyChangedValues) => {
      if (
        recentlyChangedValues.packingDetails.length === 0 ||
        (recentlyChangedValues.packingDetails.length === 1 &&
          equalFields(recentlyChangedValues.packingDetails[0], EMPTY_FIELD))
      ) {
        form.setFieldsValue({ packingDetails: [EMPTY_FIELD] });
        setEmptyForm(true);
      } else {
        setEmptyForm(false);
      }
      onValuesChange(recentlyChangedValues);
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
                canDelete={(isEditing && !emptyForm) || fields.length > 1}
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
