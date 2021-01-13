import React, { useEffect, useState } from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Field from "../CustomField/Field";
import get from "lodash/get";

const VariantDetails = ({ form, productDetails }) => {
  const [details, setDetails] = useState();

  useEffect(() => {
    if (productDetails) {
      const detail = JSON.parse(productDetails.detail);
      const { offerDetails } = detail;
      form.setFieldsValue({ offerDetails });
      setDetails(offerDetails);
    }
  }, [productDetails, form]);
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
                productType={get(details, `[${index}].type`)}
                form={form}
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
      <Form.Item name={"childValue"}></Form.Item>
    </Form>
  );
};

export default VariantDetails;
