import React, { useEffect, useState, useCallback } from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import get from "lodash/get";

import Field from "../CustomField/Field";
import { EMPTY_FIELD } from "../../constants";

const OfferDetails = ({ form, productDetails, isEditing = false }) => {
  const [emptyForm, setEmptyForm] = useState(false);

  useEffect(() => {
    if (productDetails) {
      const detail = JSON.parse(productDetails.detail);
      const { offerDetails } = detail;
      if (offerDetails) {
        form.setFieldsValue({ offerDetails });
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
      if (recentlyChangedValues.offerDetails.length === 0) {
        form.setFieldsValue({ offerDetails: [EMPTY_FIELD] });
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
      initialValues={{
        offerDetails: [EMPTY_FIELD]
      }}
    >
      <Form.List name="offerDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Field
                key={`offer-field-${field.key}`}
                form={form}
                field={field}
                index={index}
                canDelete={(isEditing && !emptyForm) || fields.length > 1}
                fieldValue={get(form.getFieldsValue(), `offerDetails.[${index}]`)}
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

export default OfferDetails;
