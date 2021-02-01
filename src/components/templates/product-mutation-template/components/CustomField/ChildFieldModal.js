import React, { useCallback, useState } from "react";
import { Collapse, Card, Row, Col, Select, Input, Modal, Switch, Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FIELD_TYPE } from "../../constants";
import FieldLayout from "./FieldLayout";
import "../../product-mutation-template.comp.scss";

const ChildFieldModal = ({
  isOpen,
  closeModal,
  form,
  handleSave,
  selectedFieldType,
  isHiddenIconRemove,
  numberField,
  parentId,
  currentPlotOptions
}) => {
  const handleOK = (e) => {
    debugger;
    const formValue = [
      { ...form?.getFieldsValue()?.childField[0], parentId, plotOption: currentPlotOptions }
    ];
    const errorField = formValue.find((value) => {
      if (!value?.fieldName || !value?.type) {
        return true;
      }
      if (value?.fieldOption[0] === "") {
        return true;
      }
      if (
        value.fieldOption.find(
          (childValue) => !childValue.label && !childValue.allowInput && !childValue.textboxType
        )
      ) {
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

  const handleAddItem = (callback) => {
    callback({
      fieldName: "",
      fieldType: "",
      fieldOption: [""]
    });
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
                  {...{
                    field,
                    index,
                    selectedFieldType,
                    form,
                    isHiddenIconRemove,
                    numberField,
                    isOpen
                  }}
                  numberField={fields.length}
                  remove={() => remove(field.name)}
                  childAble={false}
                />
              ))}
              <Form.Item className="mt-3">
                <Button
                  type="primary"
                  onClick={() => handleAddItem(add)}
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
