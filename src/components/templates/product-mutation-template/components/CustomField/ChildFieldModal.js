import React, { useCallback, useState } from "react";
import { Collapse, Card, Row, Col, Select, Input, Modal, Switch, Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FIELD_TYPE } from "../../constants";
import FieldLayout from "./FieldLayout";
import "../../product-mutation-template.comp.scss";

const ChildFieldModal = ({ isOpen, closeModal, form, handleSave, selectedFieldType }) => {
  const handleOK = (e) => {
    const formValue = form?.getFieldsValue()?.childField;
    const errorField = formValue.find((value) => {
      if (!value?.fieldName || !value?.type) {
        return true;
      }
      if (value?.fieldOption[0] === "") {
        return true;
      }
      if (value.fieldOption.find((childValue) => !childValue.label)) {
        return true;
      }
      return false;
    });
    if (errorField) {
      form.validateFields();
    } else {
      //
      handleSave(formValue);
    }
  };
  return (
    <Modal
      centered
      title="Add child field(s) to this value"
      visible={isOpen}
      onCancel={closeModal}
      okText="Save"
      width={800}
      onOk={handleOK}
    >
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
        <Form.List name="childField">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <FieldLayout
                  {...{ field, index, selectedFieldType }}
                  remove={() => remove(field.name)}
                  childAble={false}
                />
              ))}
              <Form.Item className="mt-3">
                <Button
                  type="primary"
                  onClick={() =>
                    add({
                      fieldName: "",
                      fieldType: "",
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
    </Modal>
  );
};

export default ChildFieldModal;
