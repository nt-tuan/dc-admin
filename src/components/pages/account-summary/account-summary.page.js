import { Button } from "antd";
import { financialMapper } from "commons/mappers";
import { accountSummaryTableSchema } from "commons/schemas";
import { DTCTable } from "components";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { handleDownloadExcelNew } from "utils/general.util";

const { parseDataToExcel, parseDataToGridView } = financialMapper;

const AccountSummaryPage = () => {
  const [accountSummary, setAccountSummary] = useState([]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      setAccountSummary(parseDataToGridView(fakeData));
    });
  }, []);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(accountSummary);
    const fileName = `AccountSummary`;
    const fileSheet = "accountSummary";
    handleDownloadExcelNew(dataExcel, fileName, fileSheet);
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
    timestamp: "2020-06-11T16:01:12",
    number: "023771829911",
    destinationCity: "Sydney",
    destinationCountry: "Australia",
    paymentDueDate: "2020-06-11T15:01:12",
    originCity: "Dubai",
    originCountry: "UAE",
    totalPrice: 1500.1,
    commission: 150
  },
  {
    timestamp: "2020-06-11T14:01:12",
    number: "023771829911",
    destinationCity: "Bangkok",
    destinationCountry: "Thailand",
    paymentDueDate: "2020-06-12T14:01:12",
    originCity: "Sydney",
    originCountry: "Australia",
    totalPrice: 3000.3,
    commission: 100
  },
  {
    timestamp: "2020-06-11T12:01:12",
    number: "92328211916",
    destinationCity: "Sydney",
    destinationCountry: "Australia",
    paymentDueDate: "2020-06-13T16:01:12",
    originCity: "Abu Dhabi",
    originCountry: "UAE",
    totalPrice: 4000.2,
    commission: 200
  },
  {
    timestamp: "2020-06-11T11:01:12",
    number: "332183218712",
    destinationCity: "Sydney",
    destinationCountry: "Australia",
    paymentDueDate: "2020-06-13T11:02:12",
    originCity: "London",
    originCountry: "UK",
    totalPrice: 6300.0,
    commission: 300
  }
];
