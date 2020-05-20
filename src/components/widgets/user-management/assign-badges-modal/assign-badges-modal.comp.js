import React from "react";
import { Modal, Checkbox, Button } from "antd";
import { ReactComponent as ManuFactorBadge } from "assets/icons/distributor.svg";
import { ReactComponent as DistributorBadge } from "assets/icons/manufactor.svg";

export const AssignBadgesModal = ({ showForm, toggleShowForm }) => {
  return (
    <Modal
      width={620}
      title="Choose Badges and Assign badges to your User"
      visible={showForm}
      footer={null}
      onOk={toggleShowForm}
      onCancel={toggleShowForm}
    >
      <div className="row text-center mx-auto">
        <div className="col-6 col-sm-4 col-md-4 col-lg-4">
          <div className="w-50 mx-auto">
            <ManuFactorBadge />
          </div>
          <div>
            <span>
              <Checkbox>Manufacturer</Checkbox>
            </span>
          </div>
        </div>

        <div className="col-6 col-sm-4 col-md-4 col-lg-4">
          <div className="w-50 mx-auto">
            <DistributorBadge />
          </div>
          <div>
            <span>
              <Checkbox>Distributor</Checkbox>
            </span>
          </div>
        </div>

        <div className="col-12 mt-4">
          <Button key="cancel" className="mr-4 mb-2" onClick={toggleShowForm}>
            Cancel
          </Button>
          <Button key="assign" className="mb-2" type="primary" onClick={toggleShowForm}>
            Assign
          </Button>
        </div>
      </div>
    </Modal>
  );
};
