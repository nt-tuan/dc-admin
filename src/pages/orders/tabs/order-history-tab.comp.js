import React, { useState } from "react";
import { DTCTable } from "components/widgets";
import { getOrderHistoryTableSchema, ORDERS_SCHEMA } from "commons/schemas";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { handleDownloadExcel } from "utils";

const { FIELDS, LABELS } = ORDERS_SCHEMA;

const columns = () => {
  const columns = getOrderHistoryTableSchema();
  return [
    columns[FIELDS.orderNumber],
    columns[FIELDS.productName],
    columns[FIELDS.quantity],
    columns[FIELDS.unitPrice],
    columns[FIELDS.totalPrice],
    columns[FIELDS.buyerCompanyName],
    columns[FIELDS.sellerCompanyName],
    columns[FIELDS.status]
  ];
};

const labelIndex = {
  [FIELDS.orderNumber]: 0,
  [FIELDS.productName]: 1,
  [FIELDS.quantity]: 2,
  [FIELDS.unitPrice]: 3,
  [FIELDS.totalPrice]: 4,
  [FIELDS.buyerCompanyName]: 5,
  [FIELDS.sellerCompanyName]: 6,
  [FIELDS.status]: 7
};

export const OrderHistoryTab = () => {
  const [data, setData] = useState(fakedData);
  const handleDownload = () => {
    handleDownloadExcel(data, labelIndex, LABELS, FIELDS, "Orders");
  };
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <Button type="primary" icon={<DownloadOutlined />} className="mb-3" onClick={handleDownload}>
        Download
      </Button>
      <DTCTable
        showSettings={false}
        data={data}
        columns={columns()}
        isLoading={false}
        onChange={(value) => setData(value)}
      />
    </div>
  );
};

const fakedData = [
  {
    id: 1,
    orderNumber: 12345678,
    productName: "Apple iPhone 11 Black 64GB",
    quantity: 200,
    unitPrice: 3000,
    totalPrice: 40000,
    buyerCompanyName: "buyer",
    sellerCompanyName: "seller",
    status: "Order Cancelled"
  },
  {
    id: 2,
    orderNumber: 12345680,
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: 300,
    unitPrice: 10000,
    totalPrice: 600000,
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Completed"
  }
];
