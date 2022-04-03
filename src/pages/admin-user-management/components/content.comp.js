import React from "react";
import { StyledDTCTable, DTCTableWrapper } from "../style.comp";
import NoUsers from "./no-users.comp";

const AdminUsersContent = ({
  haveUsers,
  loading,
  columns,
  dataSource = [],
  showSettings = false,
  ...rest
}) => {
  return (
    <>
      {!haveUsers && <NoUsers />}
      {haveUsers && (
        <DTCTableWrapper>
          <StyledDTCTable
            showSettings={showSettings}
            loading={loading}
            columns={columns}
            columnBuffer={columns.length}
            dataSource={dataSource}
            {...rest}
          />
        </DTCTableWrapper>
      )}
    </>
  );
};

export default React.memo(AdminUsersContent);
