import React, { useState, useEffect, useCallback } from "react";
import { DTCTable } from "components/atoms";
import { rebatesTableSchema, REBATES_SCHEMA } from "commons/schemas";
import { useBooleanState } from "hooks/utilHooks";
import { Modal, message } from "antd";
import { TableSetting } from "components/molecules";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { RebatesService } from "services";
import { getAllRecordsFromAPI } from "utils/general.util";

const { FIELDS, LABELS } = REBATES_SCHEMA;

const columnOptions = [
  FIELDS.timestamp,
  FIELDS.buyerCompanyName,
  FIELDS.productBrand,
  FIELDS.ownerNameEmail,
  FIELDS.contact,
  FIELDS.rebatePercentage
];

const Rebates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTableSettings, toggleShowTableSettings] = useBooleanState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  const getRebatesList = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getAllRecordsFromAPI(RebatesService.getRebates);
      setData(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getRebatesList();
  }, [getRebatesList]);

  const handleDeleteRebate = (id) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await RebatesService.deleteRebates(id);
      getRebatesList();
      message.success("Rebates has been deleted!");
    });
  };

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

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <DTCTable
        showSettings={false}
        loading={loading}
        dataSource={data}
        schema={rebatesTableSchema(handleDeleteRebate)}
        showSetting={true}
        onSettingClick={toggleShowTableSettings}
        hiddenColumns={hiddenColumns}
      />
      {renderTableSettingModal()}
    </div>
  );
};

export default Rebates;
