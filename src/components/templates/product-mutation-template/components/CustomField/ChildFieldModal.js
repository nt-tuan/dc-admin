import React, { useEffect } from "react";
import { Modal, Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import FieldLayout from "./FieldLayout";
import { EMPTY_FIELD } from "../../constants";
// import "../../product-mutation-template.comp.scss";

const ChildFieldModal = ({
  data = [EMPTY_FIELD],
  isOpen,
  closeModal,
  form,
  handleSave,
  parentId,
  currentPlotOptions
}) => {
  useEffect(() => {
    form.setFieldsValue({ childField: data });
  }, [data, form]);

  const handleOK = (e) => {
    let formValue = form?.getFieldsValue()?.childField.map((child) => {
      return {
        ...child,
        parentId,
        plotOption: currentPlotOptions
      };
    });

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
      handleSave(formValue);
    }
  };

  const handleAddItem = (callback) => {
    callback(EMPTY_FIELD);
  };

  const handleRemoveItem = (callback, index) => {
    callback(index);
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
      <Form form={form} initialValues={{ childField: data }}>
        <Form.List name="childField">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                return (
                  <FieldLayout
                    form={form}
                    field={field}
                    index={index}
                    canDelete={fields.length > 1}
                    onRemoveField={() => handleRemoveItem(remove, index)}
                    canAddChildFields={false}
                    fieldValue={
                      form.getFieldsValue().childField && form.getFieldsValue().childField[index]
                    }
                  />
                );
              })}
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
