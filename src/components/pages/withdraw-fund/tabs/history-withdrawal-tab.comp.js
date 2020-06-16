import React, { useState, useEffect } from "react";
import { historyWithdrawalTableSchema } from "commons/schemas";
import { Button } from "antd";
import { DTCTable } from "components/atoms";
import { withdrawHistoryMapper } from "commons/mappers";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { handleDownloadExcelNew } from "utils/general.util";

const { parseDataToExcel, parseDataToGridView } = withdrawHistoryMapper;

export const HistoryWithdrawalTab = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      setData(parseDataToGridView(fakedData));
    });
  }, []);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(data);
    const fileName = "History-withdrawal";
    const fileSheet = "HistoryWithdrawal";
    handleDownloadExcelNew(dataExcel, fileName, fileSheet);
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="text-primary font-weight-bold">Wallet History</h5>
        <Button type="primary" onClick={handleDownload}>
          <i className="fe fe-download mr-2" /> Download
        </Button>
      </div>
      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={data}
        onChange={(value) => setData(value)}
        schema={historyWithdrawalTableSchema()}
      />
    </div>
  );
};

const fakedData = [
  {
    id: 0,
    requestedDate: "2020-05-25T19:17:50",
    processedDate: "2020-05-30T09:17:50",
    withdrawalId: 10,
    depositedAccount: "Acc No.4",
    debit: 11,
    currency: "USD",
    status: "status"
  },
  {
    id: 1,
    requestedDate: "2020-05-22T09:17:50",
    processedDate: "2020-05-21T09:17:50",
    withdrawalId: 13,
    depositedAccount: "Acc No.5",
    debit: 14,
    currency: "USD",
    status: "status1"
  }
];
