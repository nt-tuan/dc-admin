import React, { useState } from "react";
import { DTCTable } from "components/widgets";
import { getOrderActiveTableSchema, ORDERS_SCHEMA } from "commons/schemas";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { handleDownloadExcel } from "utils";

const { FIELDS, LABELS } = ORDERS_SCHEMA;

const columns = () => {
  const columns = getOrderActiveTableSchema();
  return [
    columns[FIELDS.orderNumber],
    columns[FIELDS.productCategory],
    columns[FIELDS.productType],
    columns[FIELDS.productBrand],
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
  [FIELDS.productCategory]: 1,
  [FIELDS.productType]: 2,
  [FIELDS.productBrand]: 3,
  [FIELDS.productName]: 4,
  [FIELDS.quantity]: 5,
  [FIELDS.unitPrice]: 6,
  [FIELDS.totalPrice]: 7,
  [FIELDS.buyerCompanyName]: 8,
  [FIELDS.sellerCompanyName]: 9,
  [FIELDS.status]: 10
};

export const OrderActiveTab = () => {
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
    productCategory: "A",
    productType: "c",
    productBrand: "xyz",
    productName: "Apple iPhone 11 Black 64GB",
    quantity: "111",
    unitPrice: "333",
    totalPrice: "555",
    buyerCompanyName: "buyer",
    sellerCompanyName: "seller",
    status: "Order Completed"
  },
  {
    id: 2,
    orderNumber: 12345679,
    productCategory: "B",
    productType: "d",
    productBrand: "abc",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  },
  {
    id: 3,
    orderNumber: 12345681,
    productCategory: "B",
    productType: "d",
    productBrand: "abc",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  },
  {
    id: 4,
    orderNumber: 12345685,
    productCategory: "B",
    productType: "d",
    productBrand: "abc",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  },
  {
    id: 5,
    orderNumber: 12345687,
    productCategory: "B",
    productType: "d",
    productBrand: "abc",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  },
  {
    id: 6,
    orderNumber: 12345690,
    productCategory: "B",
    productType: "d",
    productBrand: "abc",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  }
];
