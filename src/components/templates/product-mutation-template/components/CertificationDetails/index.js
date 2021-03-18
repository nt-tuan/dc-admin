import React, { useEffect, useCallback, useState } from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import get from "lodash/get";
import { equalFields } from "utils/form.util";

import Field from "../CustomField/Field";
import { EMPTY_FIELD } from "../../constants";

const CertificationDetails = ({ form, onValuesChange, productDetails, isEditing = false }) => {
  const [emptyForm, setEmptyForm] = useState(false);

  useEffect(() => {
    if (productDetails) {
      const detail = JSON.parse(productDetails.detail);
      const { certificationDetails } = detail;
      if (certificationDetails) {
        form.setFieldsValue({ certificationDetails });
      } else {
        setEmptyForm(true);
        form.setFieldsValue({ certificationDetails: [EMPTY_FIELD] });
      }
    }
  }, [productDetails, form]);

  const handleAddingItem = (callback) => {
    callback(EMPTY_FIELD);
  };

  const handleValuesChange = useCallback(
    (recentlyChangedValues) => {
      if (
        recentlyChangedValues.certificationDetails.length === 0 ||
        (recentlyChangedValues.certificationDetails.length === 1 &&
          equalFields(recentlyChangedValues.certificationDetails[0], EMPTY_FIELD))
      ) {
        form.setFieldsValue({ certificationDetails: [EMPTY_FIELD] });
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
        certificationDetails: [EMPTY_FIELD]
      }}
      onValuesChange={handleValuesChange}
    >
      <Form.List name="certificationDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Field
                key={`certification-field-${field.key}`}
                form={form}
                field={field}
                index={index}
                canDelete={(isEditing && !emptyForm) || fields.length > 1}
                fieldValue={get(form.getFieldsValue(), `certificationDetails.[${index}]`)}
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

export default CertificationDetails;
