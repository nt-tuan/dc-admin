import React, { useEffect, useCallback } from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import get from "lodash/get";

import Field from "../CustomField/Field";
import { EMPTY_FIELD } from "../../constants";

const CertificationDetails = ({
  form,
  onValuesChange,
  productDetails,
  setHasCertificationDetails
}) => {
  useEffect(() => {
    if (productDetails) {
      const detail = JSON.parse(productDetails.detail);
      const { certificationDetails } = detail;
      if (certificationDetails) {
        form.setFieldsValue({ certificationDetails });
        setHasCertificationDetails(true);
      } else {
        form.setFieldsValue({ certificationDetails: [EMPTY_FIELD] });
      }
    }
  }, [productDetails, form, setHasCertificationDetails]);

  const handleAddingItem = (callback) => {
    callback(EMPTY_FIELD);
  };

  const handleValuesChange = useCallback(
    (recentlyChangedValues) => {
      onValuesChange(recentlyChangedValues);
    },
    [onValuesChange]
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
                canDelete
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
