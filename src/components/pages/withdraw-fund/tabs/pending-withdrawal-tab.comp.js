import React, { useState, useEffect } from "react";
import { pendingWithdrawalTableSchema } from "commons/schemas";
import { Button } from "antd";
import { DTCTable } from "components/atoms";
import { withdrawPendingMapper } from "commons/mappers";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { handleDownloadExcelNew } from "utils/general.util";

const { parseDataToExcel, parseDataToGridView } = withdrawPendingMapper;

export const PendingWithdrawalTab = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      setData(parseDataToGridView(fakedData));
    });
  }, []);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(data);
    const fileName = "Pending-withdrawal";
    const fileSheet = "PendingWithdrawal";
    handleDownloadExcelNew(dataExcel, fileName, fileSheet);
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="text-primary font-weight-bold">Wallet Pending</h5>
        <Button type="primary" onClick={handleDownload}>
          <i className="fe fe-download mr-2" /> Download
        </Button>
      </div>
      <DTCTable
        showSettings={false}
        loading={false}
        onChange={(value) => setData(value)}
        dataSource={parseDataToGridView(data)}
        schema={pendingWithdrawalTableSchema()}
      />
    </div>
  );
};

const fakedData = [
  {
    id: 0,
    timeStamp: "2020-05-26T09:17:50",
    withdrawalId: 1,
    depositedAccount: "Acc No.1",
    debit: 2,
    currency: "USD"
  },
  {
    id: 1,
    timeStamp: "2020-05-25T09:17:50",
    withdrawalId: 4,
    depositedAccount: "Acc No.2",
    debit: 5,
    currency: "USD"
  }
];
