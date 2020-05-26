import React from "react";
import { DTCTable } from "components/atoms";
import { userMgtTableSchema } from "commons/schemas";

export const UserMgtBuyerTable = ({ users, onLock, onUnlock, onViewAssignBadges }) => {
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <DTCTable
        showSettings={false}
        loading={false}
        hiddenColumns={[]}
        dataSource={users}
        schema={userMgtTableSchema({ onLock, onUnlock, onViewAssignBadges })}
        renderFooter={() => {}}
        rowSelection={null}
      />
    </div>
  );
};
