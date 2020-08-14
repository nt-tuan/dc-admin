import React, { useState } from "react";
import { DTCTable } from "components/atoms";
import { useBooleanState } from "hooks/utilHooks";
import { Modal } from "antd";
import { TableSetting } from "components/molecules";
import { creditStatusSchema, MARKETPLACE_CREDIT_SCHEMA } from "commons/schemas";

const { FIELDS, LABELS } = MARKETPLACE_CREDIT_SCHEMA;

const columnOptions = [
  FIELDS.timestamp,
  FIELDS.orderNumber,
  FIELDS.buyerCompanyName,
  FIELDS.productCategory,
  FIELDS.productType,
  FIELDS.productBrand,
  FIELDS.productName,
  FIELDS.quantity,
  FIELDS.unitPrice,
  FIELDS.totalPrice,
  FIELDS.creditTerms,
  FIELDS.paymentOverdue,
  FIELDS.paymentDueDate,
  FIELDS.status
];

export const CreditStatusContainer = ({ data, loading, isActive }) => {
  const [showTableSettings, toggleShowTableSettings] = useBooleanState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);

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
    <div className="air__utils__shadow bg-white p-4 dtc-br-10 mt-3">
      <DTCTable
        showSettings={false}
        loading={loading}
        dataSource={data}
        schema={creditStatusSchema(isActive)}
        showSetting={true}
        onSettingClick={toggleShowTableSettings}
        hiddenColumns={hiddenColumns}
      />
      {renderTableSettingModal()}
    </div>
  );
};
