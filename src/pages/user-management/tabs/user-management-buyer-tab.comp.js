import React, { useState, useEffect, Fragment } from "react";
import { UserMgtBuyerTable, AssignBadgesModal } from "components/widgets/user-management";
import { USER_MANAGEMENT_SCHEMA } from "commons/schemas/user-management.schema";
import { useBooleanState } from "hooks/utilHooks";

const { STATUS, STATUS_LABELS } = USER_MANAGEMENT_SCHEMA;

export const UserManagementBuyerTab = () => {
  const [data, setData] = useState([]);
  const [showForm, toggleShowForm] = useBooleanState(false);

  useEffect(() => {
    setData(users.sort((a, b) => a.id - b.id));
  }, []);

  const handleBlock = (id) => {
    const item = data.find((item) => item.id === id);
    const itemAfterRemove = [...data].filter((item) => item.id !== id);
    const res = [{ ...item, status: STATUS_LABELS[STATUS.SUSPENDED] }, ...itemAfterRemove].sort(
      (a, b) => a.id - b.id
    );
    setData(res);
  };

  const handleUnblock = (id) => {
    const item = data.find((item) => item.id === id);
    const itemAfterRemove = [...data].filter((item) => item.id !== id);
    const res = [{ ...item, status: STATUS_LABELS[STATUS.BUYING_BUYERS] }, ...itemAfterRemove].sort(
      (a, b) => a.id - b.id
    );
    setData(res);
  };

  return (
    <Fragment>
      <UserMgtBuyerTable
        users={data}
        onUnblock={handleUnblock}
        onBlock={handleBlock}
        onViewAssignBadges={toggleShowForm}
      />

      <AssignBadgesModal showForm={showForm} toggleShowForm={toggleShowForm} />
    </Fragment>
  );
};

const users = [
  {
    id: 1,
    company: "Morphotech",
    owner: "Buyer Owner 1",
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
    status: STATUS_LABELS[STATUS.LIVE_BUYERS]
  },
  {
    id: 2,
    company: "Morphotech",
    owner: "Buyer Owner 2",
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
    status: STATUS_LABELS[STATUS.BUYING_BUYERS]
  },
  {
    id: 3,
    company: "Morphotech",
    owner: "Buyer Owner 3",
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
    status: STATUS_LABELS[STATUS.INACTIVE_BUYERS]
  },
  {
    id: 4,
    company: "Morphotech",
    owner: "Buyer Owner 4",
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
