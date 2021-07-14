import React from "react";
import { Modal } from "antd";
import { EditUserForm } from "components/organisms/user-management/edit-user-form.comp";

export const EditUserModal = ({ isOpen, onCancel, onConfirm, user }) => {
  return (
    <Modal
      title="Edit User"
      visible={isOpen}
      onCancel={onCancel}
      maskStyle={{ backgroundColor: "rgba(0,0,0,0.15)" }}
      footer={null}
    >
      <EditUserForm user={user} onCancel={onCancel} onSuccess={onConfirm} />
    </Modal>
  );
};
