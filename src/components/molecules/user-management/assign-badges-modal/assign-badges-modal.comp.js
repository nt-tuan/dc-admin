import { Button, Checkbox, Modal, Empty } from "antd";
import { ReactComponent as ManuFactorBadge } from "assets/icons/distributor.svg";
import { ReactComponent as DistributorBadge } from "assets/icons/manufactor.svg";
import React, { useState } from "react";
import { USER_MANAGEMENT_SCHEMA } from "commons/schemas";

const { BADGE_TYPES, BADGE_LABELS } = USER_MANAGEMENT_SCHEMA;

const IMAGE_SCHEMA = {
  [BADGE_TYPES.DISTRIBUTOR]: <DistributorBadge />,
  [BADGE_TYPES.MANUFACTURE]: <ManuFactorBadge />
};

export const AssignBadgesModal = ({ showForm, toggleShowForm, badges, onAssign, loading }) => {
  const [types, setTypes] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    const index = types.indexOf(value);
    if (index === -1) {
      setTypes([...types, value]);
    } else {
      setTypes(types.filter((type) => type !== value));
    }
  };

  console.log(loading);
  return (
    <Modal
      width={620}
      title="Choose Badges and Assign badges to your User"
      visible={showForm}
      footer={null}
      onCancel={toggleShowForm}
      afterClose={() => setTypes([])}
      destroyOnClose={true}
    >
      <div className="row text-center mx-auto">
        {badges.length === 0 ? (
          <div className="text-center w-100">
            <Empty description="This company has been assigned all badges available" />
          </div>
        ) : (
          badges.map((badge, index) => (
            <div className="col-6 col-sm-4 col-md-4 col-lg-4" key={`${BADGE_TYPES.badge}-${index}`}>
              <div className="w-50 mx-auto">{IMAGE_SCHEMA[BADGE_TYPES[badge]]}</div>
              <div className="font-weight-bold">
                <Checkbox.Group>
                  <Checkbox value={BADGE_TYPES[badge]} onChange={handleChange}>
                    {BADGE_LABELS[BADGE_TYPES[badge]]}
                  </Checkbox>
                </Checkbox.Group>
              </div>
            </div>
          ))
        )}

        <div className="col-12 mt-4">
          <Button key="cancel" className="mr-4 mb-2" onClick={toggleShowForm}>
            Cancel
          </Button>
          <Button
            key="assign"
            className="mb-2"
            type="primary"
            onClick={() => {
              onAssign(types);
              toggleShowForm();
            }}
            disabled={badges.length === 0 || loading === true}
            loading={loading}
          >
            Assign
          </Button>
        </div>
      </div>
    </Modal>
  );
};
