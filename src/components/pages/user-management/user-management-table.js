import { DTCSection, DTCTable } from "components/commons";
import React, { Fragment, useCallback, useEffect, useState } from "react";

import { AssignBadgesModal } from "./badge-assign-modal.comp";
import Box from "@mui/material/Box";
import { DTCConfirmModal } from "components/commons/dtc-modal/dtc-confirm-modal.comp";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { getUserTableColumns } from "./user-management-table.schema";
import { userMapper } from "commons/mappers";

const { parseDataToGridView } = userMapper;

const filterColumns = (columns, hiddenColumns) => {
  if (hiddenColumns == null) return columns;
  return columns.filter((column) => !hiddenColumns.includes(column.field));
};

export const UserManagementTable = ({ getUserFn, hiddenColumns }) => {
  const [data, setData] = useState([]);
  const [currentCompanyId, setCurrentCompanyId] = useState();
  const [showAssignBadgeForm, setShowAssignBadgeForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const viewShowAssignBadgeFormWrapper = (company) => {
    asyncErrorHandlerWrapper(async () => {
      setShowAssignBadgeForm(true);
      setCurrentCompanyId(company);
    });
  };

  const getListAllUsers = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const data = await getAllRecordsFromAPI(getUserFn);
      setData(parseDataToGridView(data));
      setLoading(false);
    });
  }, [getUserFn]);

  useEffect(() => {
    getListAllUsers();
  }, [getListAllUsers]);

  const handleLock = (companyId) => {
    setCurrentCompanyId(companyId);
    setShowConfirm(true);
  };

  const handleUnlock = (companyId) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.unsuspendUser({ companyId });
      getListAllUsers();
    });
  };

  const handelConfirmLock = () => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.suspendUser({ companyId: currentCompanyId });
      getListAllUsers();
      setShowConfirm(false);
    });
  };

  const columns = filterColumns(
    getUserTableColumns({
      onUnlock: handleUnlock,
      onLock: handleLock,
      onViewAssignBadges: viewShowAssignBadgeFormWrapper
    }),
    hiddenColumns
  );

  const handleClose = () => {
    setShowAssignBadgeForm(false);
    getListAllUsers();
  };

  return (
    <Fragment>
      <DTCSection>
        <DTCSection.Content>
          <Box height={500}>
            <DTCTable
              getRowId={(row) => row.id}
              showSetting={false}
              loading={loading}
              dataSource={data}
              columns={columns}
            />
          </Box>
        </DTCSection.Content>
      </DTCSection>

      <DTCConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handelConfirmLock}
        title="Please Confirm"
        content="Please note that if you disable the account, all the actions and processes of this user will be suspended."
      />

      {showAssignBadgeForm && (
        <AssignBadgesModal
          company={currentCompanyId}
          open={showAssignBadgeForm}
          onClose={handleClose}
        />
      )}
    </Fragment>
  );
};
