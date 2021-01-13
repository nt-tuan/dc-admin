import React, { forwardRef, useCallback, useState } from "react";
import { Modal, Form } from "antd";
import get from "lodash/get";
import ChildFieldModal from "./ChildFieldModal";
import FieldLayout from "./FieldLayout";
import "../../product-mutation-template.comp.scss";

const Field = forwardRef(
  (
    {
      type,
      onRemove,
      name,
      field,
      fieldKey,
      remove,
      form,
      index,
      handleFieldChange,
      numberField,
      isHiddenIconRemove,
      productType
    },
    ref
  ) => {
    const [isTypeModalOpen, setTypeModalOpen] = useState(false);
    const [childValue, setChildValue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState();
    const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);
    const [isChildModalOpen, setIsChildModalOpen] = useState(false);
    const [childForm] = Form.useForm();
    const handleSave = useCallback(
      (value) => {
        const newChildValue = [...childValue];
        newChildValue[currentIndex] = value;
        form.setFieldsValue({ childValue: newChildValue });
        setChildValue(newChildValue);
        setIsChildModalOpen(false);
        if (handleFieldChange) {
          handleFieldChange();
        }
      },
      [childValue, currentIndex, form, handleFieldChange]
    );

    const handleRemove = useCallback(
      (index) => {
        const newChildValue = [...childValue];
        newChildValue.splice(index, 1);
        setChildValue(newChildValue);
        form.setFieldsValue({ childValue: newChildValue });
      },
      [childValue, form]
    );

    const openChildField = useCallback(
      (index) => {
        setCurrentIndex(index);
        childForm.setFieldsValue({ childField: childValue[index] });
        setTimeout(() => {
          setIsChildModalOpen(true);
        }, 1);
      },
      [childForm, childValue]
    );
    return (
      <>
        <FieldLayout
          {...{
            form,
            type,
            setTypeModalOpen,
            fieldKey,
            setIsChildModalOpen,
            openChildField,
            remove,
            field,
            childValue,
            setChildValue,
            handleRemove,
            index,
            productType,
            isHiddenIconRemove,
            numberField
          }}
        />
        {isChildModalOpen && (
          <ChildFieldModal
            isOpen={isChildModalOpen}
            closeModal={() => setIsChildModalOpen(false)}
            form={childForm}
            handleSave={handleSave}
            selectedFieldType={get(childValue, `[${currentIndex}][0].type`)}
          />
        )}
        <Modal
          centered
          visible={isTypeModalOpen}
          onCancel={() => setTypeModalOpen(false)}
          footer={null}
          okText=""
        >
          <p className="mt-3">
            You can switch a field type by selecting an option from the dropdown menu. When you
            switch question types, some previously entered data, such as field values and child
            fields of each value (if any) may not be saved.
          </p>
        </Modal>
        <Modal
          visible={isOpenConfirmPopup}
          onCancel={() => setIsOpenConfirmPopup(false)}
          onOk={() => onRemove(name)}
          okText="Yes"
          cancelText="No"
          title="Are you sure?"
        >
          If you delete this field, all the data that you entered will be lost.Are you sure you want
          to delete the field
        </Modal>
        <Form.Item name={[field.name, "childValue"]}></Form.Item>
      </>
    );
  }
);

export default Field;
