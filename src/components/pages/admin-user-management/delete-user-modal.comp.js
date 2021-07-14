import React from "react";
import { Button, Modal } from "antd";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { UserService } from "services";

export const DeleteUserModal = ({ user, isOpen, onCancel, onSuccess }) => {
  const [loading, setLoading] = React.useState();
  const handleDeleteUser = () => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.deleteAdminUser(user.id);
      onSuccess && onSuccess();
    }).finally(() => setLoading(false));
  };
  return (
    <Modal
      title="Delete User"
      visible={isOpen}
      onCancel={onCancel}
      maskStyle={{ backgroundColor: "rgba(0,0,0,0.15)" }}
      footer={
        <div className="my-2">
          <Button loading={loading} type="primary" size="large" onClick={handleDeleteUser}>
            Yes
          </Button>
          <Button loading={loading} type="danger" size="large" ghost onClick={onCancel}>
            No
          </Button>
        </div>
      }
    >
      <span>Are you sure you want to delete this user?</span>
    </Modal>
  );
};
