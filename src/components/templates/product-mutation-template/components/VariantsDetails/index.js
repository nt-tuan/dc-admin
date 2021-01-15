import React, { useEffect, useState } from "react";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import get from "lodash/get";

import Field from "../CustomField/Field";

const VariantDetails = ({ form, productDetails }) => {
  const [details, setDetails] = useState();

  useEffect(() => {
    if (productDetails) {
      const detail = JSON.parse(productDetails.detail);
      const { variantDetails } = detail;
      form.setFieldsValue({ variantDetails });
      setDetails(variantDetails);
    }
  }, [productDetails, form]);
  return (
    <Form
      form={form}
      initialValues={{
        variantDetails: [
          {
            fieldName: "",
            type: "",
            fieldOption: [""]
          }
        ]
      }}
    >
      <Form.List name="variantDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Field
                productType={get(details, `[${index}].type`)}
                form={form}
                field={field}
                fieldKey={field.key}
                index={index}
                isHiddenIconRemove
                numberField={fields.length}
                fieldValue={get(details, `[${index}]`)}
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
