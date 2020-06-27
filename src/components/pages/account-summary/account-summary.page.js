import { Button } from "antd";
import { financialMapper } from "commons/mappers";
import { accountSummaryTableSchema } from "commons/schemas";
import { DTCTable } from "components";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { handleDownloadExcel, getAllRecordsFromAPI } from "utils/general.util";
import { FinancialService } from "services";
import { SORT_ORDERS } from "commons/consts";

const { parseDataToExcel, parseDataToGridView } = financialMapper;

const AccountSummaryPage = () => {
  const [accountSummary, setAccountSummary] = useState([]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const resAccountSummary = await getAllRecordsFromAPI(FinancialService.getAccountSummary, {
        sortTerm: "createdDate",
        sortOrder: SORT_ORDERS.DESC
      });
      setAccountSummary(parseDataToGridView(resAccountSummary));
    });
  }, []);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(accountSummary);
    const fileName = `Account-summary`;
    const fileSheet = "AccountSummary";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
  };

  return (
    <div>
      <Helmet title="Account Summary" />
      <div className="air__utils__shadow bg-white p-4 dtc-br-10">
        <div className="d-flex justify-content-between">
          <div className="mb-2">
            <Button className="btn btn-round btn-primary mr-2 mt-1">Copy</Button>
            <Button className="btn btn-round btn-primary mr-2 mt-1">CSV</Button>
            <Button className="btn btn-round btn-primary mr-2 mt-1">Print</Button>
          </div>
          <div className="mb-2">
            <Button type="primary" className="mt-1" onClick={handleDownload}>
              <i className="fe fe-download mr-2" /> Download
            </Button>
          </div>
        </div>
        <DTCTable
          showSettings={false}
          loading={false}
          dataSource={accountSummary}
          schema={accountSummaryTableSchema()}
          onChange={(value) => setAccountSummary(value)}
        />
      </div>
    </div>
  );
};

export default AccountSummaryPage;
