import React, { forwardRef, useCallback, useState } from "react";
import { Modal, Form } from "antd";

import ChildFieldModal from "./ChildFieldModal";
import FieldLayout from "./FieldLayout";
import "../../product-mutation-template.comp.scss";

const Field = forwardRef(({ field, form, onRemove, index, canDelete, fieldValue }, ref) => {
  const [showFieldTypeInfoPopup, setShowFieldTypeInfoPopup] = useState(false);
  const [showRemoveConfirmPopup, setShowRemoveConfirmPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [isChildFieldModalOpen, setIsChildFieldsModalOpen] = useState(false);
  const [childForm] = Form.useForm();

  const formName = Object.keys(form.getFieldsValue())[0];

  const handleSave = useCallback(
    (values) => {
      const fieldId = values[0].parentId;
      const fieldOptionIndex = values[0].plotOption;
      const newFormValues = form.getFieldsValue();
      const formName = Object.keys(newFormValues)[0];
      // if parent option isn't filled in, needs to init to an object
      if (!newFormValues[formName][fieldId].fieldOption[fieldOptionIndex]) {
        newFormValues[formName][fieldId].fieldOption[fieldOptionIndex] = {};
      }
      newFormValues[formName][fieldId].fieldOption[fieldOptionIndex].childField = values;
      form.setFieldsValue(newFormValues);
      setIsChildFieldsModalOpen(false);
    },
    [form]
  );

  const openChildFieldModal = useCallback((index) => {
    setCurrentIndex(index);
    setIsChildFieldsModalOpen(true);
  }, []);

  const onConfirmRemove = useCallback(() => {
    setShowRemoveConfirmPopup(true);
  }, []);

  const onCancelRemove = useCallback(() => {
    setShowRemoveConfirmPopup(false);
  }, []);

  const onCloseFieldTypeInfo = useCallback(() => {
    setShowFieldTypeInfoPopup(false);
  }, []);

  const onCloseChildFieldsModal = useCallback(() => {
    setIsChildFieldsModalOpen(false);
  }, []);

  return (
    <>
      <FieldLayout
        form={form}
        setTypeModalOpen={setShowFieldTypeInfoPopup}
        openChildField={openChildFieldModal}
        onRemoveField={onConfirmRemove}
        field={field}
        index={index}
        canDelete={canDelete}
        fieldValue={fieldValue}
      />
      {isChildFieldModalOpen && (
        <ChildFieldModal
          isOpen={isChildFieldModalOpen}
          closeModal={onCloseChildFieldsModal}
          form={childForm}
          field={field}
          handleSave={handleSave}
          parentId={index}
          currentPlotOptions={currentIndex}
          data={
            (currentIndex >= 0 &&
              form.getFieldsValue()[formName][index].fieldOption[currentIndex]?.childField) ||
            undefined
          }
        />
      )}
      <Modal
        centered
        visible={showFieldTypeInfoPopup}
        onCancel={onCloseFieldTypeInfo}
        footer={null}
      >
        <p className="mt-4">
          Switch a field type by selecting an option from the dropdown menu. When you switch field
          types, the previously entered data, such as field values and child fields of each value
          (if any) may be lost.
        </p>
      </Modal>
      <Modal visible={showRemoveConfirmPopup} onCancel={onCancelRemove} onOk={onRemove}>
        <p className="mt-4 mb-0">If you proceed, all entered data will be lost.</p>
        <p>Do you wish to delete this field?</p>
      </Modal>
    </>
  );
});

export default Field;
