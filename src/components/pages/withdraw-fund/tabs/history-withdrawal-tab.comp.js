import React, { useState, useEffect } from "react";
import { historyWithdrawalTableSchema } from "commons/schemas";
import { Button } from "antd";
import { DTCTable } from "components/atoms";
import { withdrawHistoryMapper } from "commons/mappers";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { handleDownloadExcel, getAllRecordsFromAPI } from "utils/general.util";
import { FinancialService } from "services";
import { SORT_ORDERS } from "commons/consts";

const { parseDataToExcel, parseDataToGridView } = withdrawHistoryMapper;

export const HistoryWithdrawalTab = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getAllRecordsFromAPI(FinancialService.getWithdrawals, {
        sortTerm: "createdDate",
        sortOrder: SORT_ORDERS.DESC,
        outerParams: { status: "COMPLETED" }
      });

      setData(parseDataToGridView(res));
    });
  }, []);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(data);
    const fileName = "History-withdrawal";
    const fileSheet = "HistoryWithdrawal";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
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
