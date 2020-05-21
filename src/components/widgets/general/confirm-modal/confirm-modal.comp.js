import React from "react";
import { Modal, Button } from "antd";

export const ConfirmModal = ({ showForm, toggleShowForm, innerText, title, onConfirmLock }) => {
  return (
    <Modal
      width={450}
      title={title}
      visible={showForm}
      footer={null}
      // onOk={toggleShowForm}
      onCancel={toggleShowForm}
    >
      <div className="row text-center mx-auto">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">{innerText}</div>

        <div className="col-12 mt-4">
          <Button key="cancel" className="mr-4 mb-2" onClick={toggleShowForm}>
            Cancel
          </Button>
          <Button key="assign" className="mb-2" type="primary" onClick={onConfirmLock}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
