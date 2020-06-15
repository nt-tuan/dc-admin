import { Button } from "antd";
import { financialMapper } from "commons/mappers";
import { accountSummaryTableSchema } from "commons/schemas";
import { DTCTable } from "components";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import XLSX from "xlsx";

const { parseDataToExcel, parseDataToGridView } = financialMapper;

const AccountSummaryPage = () => {
  const [accountSummary, setAccountSummary] = useState([]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      setAccountSummary(parseDataToGridView(fakeData));
    });
  }, []);

  const handleDownloadFinancial = () => {
    const parsedFinancial = parseDataToExcel(accountSummary);
    const sheet = XLSX.utils.json_to_sheet(parsedFinancial, {
      skipHeader: true
    });
    const excelBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(excelBook, sheet, "financial");
    XLSX.writeFile(excelBook, "ExportedFinancial.xlsx", {
      bookType: "xlsx",
      type: "file",
      sheet: "financial"
    });
  };

  return (
    <div>
      <Helmet title="Purchase - Account Summary" />
      <div className="air__utils__shadow bg-white p-4 dtc-br-10">
        <div className="d-flex justify-content-between">
          <div className="mb-2">
            <Button className="btn btn-round btn-primary mr-2 mt-1">Copy</Button>
            <Button className="btn btn-round btn-primary mr-2 mt-1">CSV</Button>
            <Button className="btn btn-round btn-primary mr-2 mt-1">Print</Button>
          </div>
          <div className="mb-2">
            <Button type="primary" className="mt-1" onClick={handleDownloadFinancial}>
              <i className="fe fe-download mr-2" /> Download
            </Button>
          </div>
        </div>
        <DTCTable
          showSettings={false}
          loading={false}
          dataSource={parseDataToGridView(accountSummary)}
          schema={accountSummaryTableSchema()}
          onChange={(value) => setAccountSummary(value)}
        />
      </div>
    </div>
  );
};

export default AccountSummaryPage;

const fakeData = [
  {
    paymentDueDate: "2020-06-11T15:01:12",
    originCity: "Dubai",
    originCountry: "UAE",
    totalPrice: 1500.1,
    commission: 150
  },
  {
    paymentDueDate: "2020-06-12T14:01:12",
    originCity: "Sydney",
    originCountry: "Australia",
    totalPrice: 3000.3,
    commission: 100
  },
  {
    paymentDueDate: "2020-06-13T16:01:12",
    originCity: "Abu Dhabi",
    originCountry: "UAE",
    totalPrice: 4000.2,
    commission: 200
  },
  {
    paymentDueDate: "2020-06-13T11:02:12",
    originCity: "London",
    originCountry: "UK",
    totalPrice: 6300.0,
    commission: 300
  }
];
