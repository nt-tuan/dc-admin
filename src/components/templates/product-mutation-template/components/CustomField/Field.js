import React, { forwardRef, useCallback, useState, useEffect } from "react";
import { Modal, Form } from "antd";
import { useSelector } from "react-redux";
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
      productType,
      fieldValue,
      parentId
    },
    ref
  ) => {
    const [isTypeModalOpen, setTypeModalOpen] = useState(false);
    const [childValue, setChildValue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState();
    const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);
    const [isChildModalOpen, setIsChildModalOpen] = useState(false);
    const [childForm] = Form.useForm();
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
      if (fieldValue?.fieldOption) {
        const selectedChildValue = fieldValue?.fieldOption.map((x) => x.childField);
        setChildValue(selectedChildValue);
      }
    }, [fieldValue]);

    const handleSave = useCallback(
      (value) => {
        //For update the child field to latest
        const allChildren = form.getFieldValue("childValue") || [];
        const latestChild = allChildren.concat(value);
        form.setFieldsValue({ childValue: latestChild });

        //For handle current child added
        const currentChild = [...childValue];
        currentChild[currentIndex] = value;
        setChildValue(currentChild);

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
        setIsChildModalOpen(true);
        childForm.setFieldsValue({ childField: childValue[index] });
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
            numberField,
            childForm
          }}
        />
        {isChildModalOpen && (
          <ChildFieldModal
            isOpen={isChildModalOpen}
            closeModal={() => setIsChildModalOpen(false)}
            form={childForm}
            handleSave={handleSave}
            isHiddenIconRemove
            numberField
            selectedFieldType={get(childValue, `[${currentIndex}][0].type`)}
            parentId={parentId}
            currentPlotOptions={currentIndex}
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
