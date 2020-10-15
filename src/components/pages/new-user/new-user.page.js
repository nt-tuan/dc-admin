import React, { useState, useEffect, useCallback } from "react";
import { DTCTable } from "components/atoms";
import { newUserTableSchema, NEW_USER_SCHEMA } from "commons/schemas";
import { useBooleanState } from "hooks/utilHooks";
import { Modal } from "antd";
import { TableSetting } from "components/molecules";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { CompanyService } from "services";
import { getAllRecordsFromAPI } from "utils/general.util";
import moment from "moment";
import { DATETIME_FORMAT, SORT_ORDERS } from "commons/consts";
import { Helmet } from "react-helmet";

const { FIELDS, LABELS } = NEW_USER_SCHEMA;

const columnOptions = [
  FIELDS.ownerName,
  FIELDS.username,
  FIELDS.email,
  FIELDS.country,
  FIELDS.contact
];

const NewUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTableSettings, toggleShowTableSettings] = useBooleanState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  const getNewUserList = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getAllRecordsFromAPI(CompanyService.getNewCompanyList, {
        sortTerm: "createdDate",
        sortOrder: SORT_ORDERS.DESC
      });
      setData(
        res.map((user) => ({
          ...user,
          createdDate: user.createdDate ? moment(user.createdDate).format(DATETIME_FORMAT) : ""
        }))
      );
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getNewUserList();
  }, [getNewUserList]);

  const handleSettingChange = (e) => {
    const { checked, option } = e.target;
    if (checked) {
      if (hiddenColumns.includes(option)) {
        setHiddenColumns(hiddenColumns.filter((col) => col !== option));
      }
    } else {
      if (!hiddenColumns.includes(option)) {
        setHiddenColumns([...hiddenColumns, option]);
      }
    }
  };

  const renderTableSettingModal = () => {
    return (
      <Modal
        title={<h4>Show/Hide Columns</h4>}
        width={700}
        visible={showTableSettings}
        onCancel={toggleShowTableSettings}
        footer={null}
      >
        <TableSetting
          onSettingChange={handleSettingChange}
          columnOptions={columnOptions}
          labels={LABELS}
        />
      </Modal>
    );
  };

  const handleApprove = (companyId) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await CompanyService.approveNewCompany({ companyId });
      getNewUserList();
    });
  };

  return (
    <article>
      <Helmet title="New User" />
      <div className="air__utils__shadow bg-white p-4 dtc-br-10">
        <DTCTable
          showSettings={false}
          loading={loading}
          dataSource={data}
          schema={newUserTableSchema(handleApprove)}
          showSetting={true}
          onSettingClick={toggleShowTableSettings}
          hiddenColumns={hiddenColumns}
        />
        {renderTableSettingModal()}
      </div>
    </article>
  );
};

export default NewUser;
