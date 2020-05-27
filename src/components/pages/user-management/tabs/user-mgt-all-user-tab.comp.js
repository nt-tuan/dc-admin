import React, { useState, useEffect, Fragment, useRef } from "react";
import { AssignBadgesModal } from "components";
import { USER_MANAGEMENT_SCHEMA, userMgtTableSchema } from "commons/schemas/user-management.schema";
import { useBooleanState } from "hooks/utilHooks";
import { ConfirmModal } from "components";
import { DTCTable } from "components/atoms";

const { STATUS, STATUS_LABELS } = USER_MANAGEMENT_SCHEMA;

export const UserManagementAllUserTab = () => {
  const [data, setData] = useState([]);
  const [showAssignBadgeForm, toggleShowAssignBadgeForm] = useBooleanState(false);
  const [showConfirmForm, toggleConfirmForm] = useBooleanState(false);
  const currentId = useRef(0);

  useEffect(() => {
    setData(users.sort((a, b) => a.id - b.id));
  }, []);

  const handleLock = () => {
    toggleConfirmForm();
    const item = data.find((item) => item.id === currentId.current);
    const itemAfterRemove = [...data].filter((item) => item.id !== currentId.current);
    const res = [{ ...item, status: STATUS_LABELS[STATUS.SUSPENDED] }, ...itemAfterRemove].sort(
      (a, b) => a.id - b.id
    );
    setData(res);
  };

  const handleUnlock = (id) => {
    const item = data.find((item) => item.id === id);
    const itemAfterRemove = [...data].filter((item) => item.id !== id);
    const res = [{ ...item, status: STATUS_LABELS[STATUS.BUYING_BUYERS] }, ...itemAfterRemove].sort(
      (a, b) => a.id - b.id
    );
    setData(res);
  };

  const handelConfirmLock = (id) => {
    currentId.current = id;
    toggleConfirmForm();
  };

  return (
    <Fragment>
      <div className="air__utils__shadow bg-white p-4 dtc-br-10">
        <DTCTable
          showSetting={false}
          loading={false}
          dataSource={data}
          schema={userMgtTableSchema({
            onLock: handelConfirmLock,
            onUnlock: handleUnlock,
            onViewAssignBadges: toggleShowAssignBadgeForm
          })}
        />
      </div>

      <ConfirmModal
        showForm={showConfirmForm}
        toggleShowForm={toggleConfirmForm}
        onConfirmLock={handleLock}
        title="Please Confirm"
        innerText="Please note that if you disable the account, all the actions and processes of this user will be suspended."
      />

      <AssignBadgesModal
        showForm={showAssignBadgeForm}
        toggleShowForm={toggleShowAssignBadgeForm}
      />
    </Fragment>
  );
};
const users = [
  {
    id: 1,
    company: "Morphotech",
    owner: "All User 1",
    username: "Username 1",
    email: "Email 1",
    country: "Country 1",
    contact: "Contact 1",
    reputation: "4.5",
    reputationList: [
      { type: "STATUS_BADGE", value: 0.0 },
      { type: "NUMBER_BADGE", value: 35.0 },
      { type: "VALUE_BADGE", value: 5000.0 }
    ],
    status: STATUS_LABELS[STATUS.LIVE_SELLERS]
  },
  {
    id: 2,
    company: "Morphotech",
    owner: "All User 2",
    username: "Username 2",
    email: "Email 2",
    country: "Country 2",
    contact: "Contact 2",
    reputation: "4",
    reputationList: [
      { type: "STATUS_BADGE", value: 0.0 },
      { type: "NUMBER_BADGE", value: 20.0 },
      { type: "VALUE_BADGE", value: 110000.0 }
    ],
    status: STATUS_LABELS[STATUS.BUYING_SELLERS]
  },
  {
    id: 3,
    company: "Morphotech",
    owner: "All User 3",
    username: "Username 3",
    email: "Email 3",
    country: "Country 3",
    contact: "Contact 3",
    reputation: "5",
    reputationList: [
      { type: "STATUS_BADGE", value: 0.0 },
      { type: "NUMBER_BADGE", value: 15.0 },
      { type: "VALUE_BADGE", value: 125000.0 }
    ],
    status: STATUS_LABELS[STATUS.INACTIVE_SELLERS]
  },
  {
    id: 4,
    company: "Morphotech",
    owner: "All User 4",
    username: "Username 4",
    email: "Email 4",
    country: "Country 4",
    contact: "Contact 4",
    reputation: "5",
    reputationList: [
      { type: "STATUS_BADGE", value: 0.0 },
      { type: "NUMBER_BADGE", value: 15.0 },
      { type: "VALUE_BADGE", value: 125000.0 }
    ],
    status: STATUS_LABELS[STATUS.SUSPENDED]
  }
];
