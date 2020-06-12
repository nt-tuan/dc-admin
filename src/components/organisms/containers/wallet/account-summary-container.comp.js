import React, { useState } from "react";
import { Button } from "antd";
import { getAccountSummarySchema, WALLET_SCHEMA } from "commons/schemas/wallet.schema";
import { DTCTable } from "components/atoms";
import { handleDownloadExcel } from "utils/general.util";

const { FIELDS, LABELS } = WALLET_SCHEMA;

const fakedData = [
  {
    id: 1,
    timestamp: "2020-06-11 09:52 AM",
    transactionType: "N/A",
    orderNumber: 321586508348919,
    productDetails: "Apple iPhone 11 Black 64GB",
    description: "Apple iPhone 11 Black 64GB",
    currency: "$",
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
    orderNumber: 32158650834342,
    productDetails: "Samsung Galaxy S20+ Cosmic grey 256GB",
    description: "Samsung Galaxy S20+ Cosmic grey 256GB",
    currency: "$",
    blocked: 3696,
    credit: 3696,
    debit: 3696,
    totalBlocked: 3696,
    availableBalance: 3696,
    currentTotalBalance: 3696
  }
];

const labelIndex = {
  [FIELDS.timestamp]: 0,
  [FIELDS.transactionType]: 1,
  [FIELDS.orderNumber]: 2,
  [FIELDS.productDetails]: 3,
  [FIELDS.description]: 4,
  [FIELDS.currency]: 5,
  [FIELDS.blocked]: 6,
  [FIELDS.credit]: 7,
  [FIELDS.debit]: 8,
  [FIELDS.totalBlocked]: 9,
  [FIELDS.availableBalance]: 10,
  [FIELDS.currentTotalBalance]: 11
};

export const AccountSummary = () => {
  const [data, setData] = useState(fakedData);
  const handleDownload = () => {
    handleDownloadExcel(data, labelIndex, LABELS, FIELDS, "Account Summary");
  };

  return (
    <section className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
      <h5 className="text-capitalize mb-2 text-primary font-weight-bold">Account Summary</h5>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button shape="round" className="mr-2">
          Transaction Details
        </Button>
        <Button type="primary" onClick={handleDownload}>
          Download
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
