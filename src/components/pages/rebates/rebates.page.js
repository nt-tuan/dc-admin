import React, { useState, useEffect, useCallback } from "react";
import { DTCTable, ConfirmModal } from "components/atoms";
import { rebatesTableSchema, REBATES_SCHEMA } from "commons/schemas";
import { useBooleanState } from "hooks/utilHooks";
import { Modal, message } from "antd";
import { TableSetting } from "components/molecules";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { RebatesService } from "services";
import { getAllRecordsFromAPI } from "utils/general.util";
import moment from "moment";
import { DATETIME_FORMAT } from "commons/consts";

const { FIELDS, LABELS } = REBATES_SCHEMA;

const columnOptions = [FIELDS.ownerName, FIELDS.ownerEmail, FIELDS.contact];

const Rebates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTableSettings, toggleShowTableSettings] = useBooleanState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [showConfirmForm, toggleConfirmForm] = useBooleanState(false);
  const [productWillDelete, setProductWillDelete] = useState({
    id: "",
    ownerName: "",
    category: ""
  });

  const getRebatesList = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getAllRecordsFromAPI(RebatesService.getRebates);
      setData(
        res.map((rebate) => ({
          ...rebate,
          createdDate: rebate.createdDate ? moment(rebate.createdDate).format(DATETIME_FORMAT) : ""
        }))
      );
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getRebatesList();
  }, [getRebatesList]);

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

  const handleConfirmDeleteRebate = (id, ownerName, category) => {
    setProductWillDelete({ id, ownerName, category });
    toggleConfirmForm();
  };

  const handleDeleteRebate = (id) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await RebatesService.deleteRebates(id);
      getRebatesList();
      message.success("Rebates has been deleted!");
    });
    toggleConfirmForm();
  };

  const renderConfirmModal = (productWillDelete) => {
    const { id, ownerName, category } = productWillDelete;
    return (
      <ConfirmModal
        showForm={showConfirmForm}
        toggleShowForm={toggleConfirmForm}
        onConfirmLock={() => handleDeleteRebate(id)}
        title="Please Confirm"
        innerText={`Do you want to delete the rebate that is set for ${ownerName} for ${category}`}
      />
    );
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <DTCTable
        showSettings={false}
        loading={loading}
        dataSource={data}
        schema={rebatesTableSchema(handleConfirmDeleteRebate)}
        showSetting={true}
        onSettingClick={toggleShowTableSettings}
        hiddenColumns={hiddenColumns}
      />
      {renderTableSettingModal()}
      {renderConfirmModal(productWillDelete)}
    </div>
  );
};

export default Rebates;
