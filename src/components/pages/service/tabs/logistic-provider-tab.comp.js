import React, { useState, useEffect, Fragment } from "react";
import { SERVICE_SCHEMA, logisticProviderTableSchema } from "commons/schemas";
import AramexLogo from "assets/images/aramex-logo.png";
import DHLLogo from "assets/images/dhl-logo.jpg";
import { Button } from "antd";
import { DTCTable } from "components/atoms";

const { STATUS, STATUS_LABELS } = SERVICE_SCHEMA;

export const ServiceLogisticProviderTab = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectRowKeys, setSelectRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys: selectRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      setSelectRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: false,
      name: record.name
    })
  };

  useEffect(() => {
    setData(providers.sort((a, b) => a.id - b.id));
  }, []);

  const handleLock = (id) => {
    const item = data.find((item) => item.id === id);
    const itemAfterRemove = [...data].filter((item) => item.id !== id);
    const res = [{ ...item, status: STATUS_LABELS[STATUS.INACTIVE] }, ...itemAfterRemove].sort(
      (a, b) => a.id - b.id
    );
    setData(res);
  };

  const handleUnlock = (id) => {
    const item = data.find((item) => item.id === id);
    const itemAfterRemove = [...data].filter((item) => item.id !== id);
    const res = [{ ...item, status: STATUS_LABELS[STATUS.ACTIVE] }, ...itemAfterRemove].sort(
      (a, b) => a.id - b.id
    );
    setData(res);
  };

  const handleUnlockAll = () => {
    if (selectedRows.length === 0) {
      return;
    }
  };

  const handleLockAll = () => {
    if (selectedRows.length === 0) {
      return;
    }
  };

  const renderFooter = () => {
    return (
      <Fragment>
        <div className="d-flex justify-content-center mb-3 mt-2">
          <Button
            type="primary"
            className="mr-2"
            onClick={handleUnlockAll}
            disabled={selectedRows.length === 0}
          >
            Unlock Selected
          </Button>
          <Button type="danger" onClick={handleLockAll} disabled={selectedRows.length === 0}>
            Lock Selected
          </Button>
        </div>
      </Fragment>
    );
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={data}
        schema={logisticProviderTableSchema({ onLock: handleLock, onUnlock: handleUnlock })}
        renderFooter={renderFooter}
        rowSelection={rowSelection}
      />
    </div>
  );
};

const providers = [
  {
    id: 1,
    name: "DHL",
    url: DHLLogo,
    reputation: 4.5,
    status: STATUS_LABELS[STATUS.ACTIVE]
  },
  {
    id: 2,
    name: "Aremex",
    url: AramexLogo,
    reputation: 4.5,
    status: STATUS_LABELS[STATUS.INACTIVE]
  }
];
