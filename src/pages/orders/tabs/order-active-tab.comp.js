import React from "react";
import { DTCTable } from "components/widgets";
import { getOrderActiveTableSchema, ORDERS_SCHEMA } from "commons/schemas";

const { FIELDS } = ORDERS_SCHEMA;

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

const data = [
  {
    id: 1,
    orderNumber: 12345678,
    productCategory: "productCategory",
    productType: "productType",
    productBrand: "productBrand",
    productName: "productName",
    quantity: "quantity",
    unitPrice: "unitPrice",
    totalPrice: "totalPrice",
    buyerCompanyName: "buyerCompanyName",
    sellerCompanyName: "sellerCompanyName",
    status: "Order Cancelled"
  },
  {
    id: 2,
    orderNumber: 12345678,
    productCategory: "productCategory",
    productType: "productType",
    productBrand: "productBrand",
    productName: "productName",
    quantity: "quantity",
    unitPrice: "unitPrice",
    totalPrice: "totalPrice",
    buyerCompanyName: "buyerCompanyName",
    sellerCompanyName: "sellerCompanyName",
    status: "Order Cancelled"
  }
];

export const OrderActiveTab = () => {
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <DTCTable showSettings={false} data={data} columns={columns()} isLoading={false} />
    </div>
  );
};
