import React from "react";
import { USER_MANAGEMENT_SCHEMA, getUserMgtTableSchema } from "commons/schemas";
import { DTCTable } from "components/atoms";

const { FIELDS } = USER_MANAGEMENT_SCHEMA;

const columns = (params) => {
  const columns = getUserMgtTableSchema(params);
  return [
    columns[FIELDS.company],
    columns[FIELDS.owner],
    columns[FIELDS.username],
    columns[FIELDS.email],
    columns[FIELDS.country],
    columns[FIELDS.contact],
    columns[FIELDS.reputation],
    columns[FIELDS.reputationList],
    columns[FIELDS.status],
    columns.manage
  ];
};

export const UserMgtSellerTable = ({ users, onLock, onUnlock, onViewAssignBadges }) => {
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <DTCTable
        showSettings={false}
        data={users}
        columns={columns({ onLock, onUnlock, onViewAssignBadges })}
        isLoading={false}
      />
    </div>
  );
};
