import React, { forwardRef, useCallback, useState } from "react";
import { Modal, Form } from "antd";
import ChildFieldModal from "./ChildFieldModal";
import FieldLayout from "./FieldLayout";
import "../../product-mutation-template.comp.scss";

const Field = forwardRef(({ type, onRemove, name, field, fieldKey, remove }, ref) => {
  const [isTypeModalOpen, setTypeModalOpen] = useState(false);
  const [childValue, setChildValue] = useState();
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);
  const [childForm] = Form.useForm();
  const handleSave = useCallback((value) => {
    setChildValue(value);
    setIsChildModalOpen(false);
  }, []);

  return (
    <>
      <FieldLayout
        {...{
          type,
          setTypeModalOpen,
          fieldKey,
          setIsChildModalOpen,
          remove,
          field,
          childValue
        }}
      />
      <ChildFieldModal
        isOpen={isChildModalOpen}
        closeModal={() => setIsChildModalOpen(false)}
        form={childForm}
        handleSave={handleSave}
      />
      <Modal
        centered
        visible={isTypeModalOpen}
        onCancel={() => setTypeModalOpen(false)}
        footer={null}
        okText=""
      >
        <p className="mt-3">
          You can switch a field type by selecting an option from the dropdown menu. When you switch
          question types, some previously entered data, such as field values and child fields of
          each value (if any) may not be saved.
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
    </>
  );
});

export default Field;
