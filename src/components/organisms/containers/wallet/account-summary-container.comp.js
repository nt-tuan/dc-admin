import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { getAccountSummarySchema } from "commons/schemas/wallet.schema";
import { DTCTable } from "components/atoms";
import { walletMapper } from "commons/mappers";
import { handleDownloadExcel } from "utils/general.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const { parseDataToGridView, parseDataToExcel } = walletMapper;

export const AccountSummary = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      setData(parseDataToGridView(fakedData));
    });
  }, []);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(data);
    const fileName = "Wallet-account-summary";
    const fileSheet = "WalletAccountSummary";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
  };

  return (
    <section className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
      <h5 className="text-capitalize mb-2 text-primary font-weight-bold">Account Summary</h5>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button shape="round" className="mr-2">
          Transaction Details
        </Button>
        <Button type="primary" onClick={handleDownload}>
          <i className="fe fe-download mr-2" /> Download
        </Button>
      </div>
      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={data}
        schema={getAccountSummarySchema()}
        onChange={(value) => setData(value)}
      />
    </section>
  );
};

const fakedData = [
  {
    id: 1,
    timestamp: "2020-06-11 09:52 AM",
    transactionType: "N/A",
    orderNumber: 31621211221,
    productDetails: "Apple iPhone 11 Black 64GB",
    description: "Apple iPhone 11 Black 64GB",
    currency: "USD",
    blocked: 4500,
    credit: 450,
    debit: 45000,
    totalBlocked: 4500,
    availableBalance: 45,
    currentTotalBalance: 4500
  },
  {
    id: 2,
    timestamp: "2020-06-12 09:52 AM",
    transactionType: "Type",
    orderNumber: 2394384712,
    productDetails: "Samsung Galaxy S20+ Cosmic grey 256GB",
    description: "Samsung Galaxy S20+ Cosmic grey 256GB",
    currency: "USD",
    blocked: 3696,
    credit: 3696,
    debit: 3696,
    totalBlocked: 3696,
    availableBalance: 3696,
    currentTotalBalance: 3696
  }
];
