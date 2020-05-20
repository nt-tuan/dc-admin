import React from "react";
import { DTCTable } from "components/widgets/general";
import {
  USER_MANAGEMENT_SCHEMA,
  getUserMgtTableSchema
} from "commons/schemas/user-management.schema";

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

export const UserMgtBuyerTable = ({ users, onBlock, onUnblock, onViewAssignBadges }) => {
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <DTCTable
        showSettings={false}
        isLoading={false}
        data={users}
        columns={columns({ onBlock, onUnblock, onViewAssignBadges })}
      />
    </div>
  );
};
