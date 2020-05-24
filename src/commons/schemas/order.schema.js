import React from "react";
import { DTCHighlighter } from "components";
import { UtilMediator } from "utils";

const { sortAlphabetically } = UtilMediator.getSortUtils();

const FIELDS = {
  timestamp: "timestamp",
  orderNumber: "orderNumber",
  productCategory: "productCategory",
  productType: "productType",
  productBrand: "productBrand",
  productName: "productName",
  quantity: "quantity",
  unitPrice: "unitPrice",
  totalPrice: "totalPrice",
  buyerCompanyName: "buyerCompanyName",
  sellerCompanyName: "sellerCompanyName",
  status: "status"
};

const LABELS = {
  [FIELDS.timestamp]: "Time Stamp",
  [FIELDS.orderNumber]: "Order Number",
  [FIELDS.productCategory]: "Product Category",
  [FIELDS.productType]: "Product Type",
  [FIELDS.productBrand]: "Product Brand",
  [FIELDS.productName]: "Product Name",
  [FIELDS.quantity]: "Quantity",
  [FIELDS.unitPrice]: "Unit Price",
  [FIELDS.totalPrice]: "Total Price",
  [FIELDS.buyerCompanyName]: "Buyer Company Name",
  [FIELDS.sellerCompanyName]: "Seller Company Name",
  [FIELDS.status]: "Status"
};

const ORDER_STATUS = {
  OFFER_APPROVED: "OFFER_APPROVED",
  PROVIDE_SHIPPING_DETAILS: "PROVIDE_SHIPPING_DETAILS",
  UPLOAD_SERIAL_NUMBER: "UPLOAD_SERIAL_NUMBER",
  CHOOSE_LOGICTICS_PROVIDER: "CHOOSE_LOGICTICS_PROVIDER",
  SHIPMENT_PICKUP: "SHIPMENT_PICKUP",
  TRACK_SHIPMENT: "TRACK_SHIPMENT",
  BUYER_INSPECTION_REPORT: "BUYER_INSPECTION_REPORT",
  REVIEW: "REVIEW",
  ORDER_COMPLETED: "ORDER_COMPLETED",
  ORDER_CANCELLED: "ORDER_CANCELLED"
};

const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.OFFER_APPROVED]: "Offer Approved",
  [ORDER_STATUS.PROVIDE_SHIPPING_DETAILS]: "Provide Shipping Details",
  [ORDER_STATUS.UPLOAD_SERIAL_NUMBER]: "Upload Serial Number",
  [ORDER_STATUS.CHOOSE_LOGICTICS_PROVIDER]: "Choose Logictics Provider",
  [ORDER_STATUS.SHIPMENT_PICKUP]: "Shipment Pickup",
  [ORDER_STATUS.TRACK_SHIPMENT]: "Tracking Shipment",
  [ORDER_STATUS.BUYER_INSPECTION_REPORT]: "Buyer's Inspection Report",
  [ORDER_STATUS.REVIEW]: "Review",
  [ORDER_STATUS.ORDER_COMPLETED]: "Order Completed",
  [ORDER_STATUS.ORDER_CANCELLED]: "Order Cancelled"
};

export const ORDERS_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  ORDER_STATUS: ORDER_STATUS,
  ORDER_STATUS_LABELS: ORDER_STATUS_LABELS
});

// active tab
export const getOrderActiveTableSchema = () => ({
  [FIELDS.timestamp]: {
    title: LABELS[FIELDS.timestamp],
    dataIndex: FIELDS.timestamp,
    key: FIELDS.timestamp,
    sorter: (a, b) => a.timeStamp - b.timeStamp,
    makeRender: ({ searchText }) => (timeStamp) => (
      <DTCHighlighter searchText={searchText} value={timeStamp || ""} />
    )
  },
  [FIELDS.orderNumber]: {
    title: LABELS[FIELDS.orderNumber],
    dataIndex: FIELDS.orderNumber,
    key: FIELDS.orderNumber,
    sorter: (a, b) => a.orderNumber - b.orderNumber,
    makeRender: ({ searchText }) => (orderNumber) => (
      <DTCHighlighter searchText={searchText} value={orderNumber} />
    )
  },
  [FIELDS.productCategory]: {
    title: LABELS[FIELDS.productCategory],
    dataIndex: FIELDS.productCategory,
    key: FIELDS.productCategory,
    sorter: (a, b) => sortAlphabetically(a.productCategory, b.productCategory),
    makeRender: ({ searchText }) => (productCategory) => (
      <DTCHighlighter searchText={searchText} value={productCategory} />
    )
  },
  [FIELDS.productType]: {
    title: LABELS[FIELDS.productType],
    dataIndex: FIELDS.productType,
    key: FIELDS.productType,
    sorter: (a, b) => sortAlphabetically(a.productType, b.productType),
    makeRender: ({ searchText }) => (productType) => (
      <DTCHighlighter searchText={searchText} value={productType} />
    )
  },
  [FIELDS.productBrand]: {
    title: LABELS[FIELDS.productBrand],
    dataIndex: FIELDS.productBrand,
    key: FIELDS.productBrand,
    sorter: (a, b) => sortAlphabetically(a.productBrand, b.productBrand),
    makeRender: ({ searchText }) => (productBrand) => (
      <DTCHighlighter searchText={searchText} value={productBrand} />
    )
  },
  [FIELDS.productName]: {
    title: LABELS[FIELDS.productName],
    dataIndex: FIELDS.productName,
    key: FIELDS.productName,
    sorter: (a, b) => sortAlphabetically(a.productName, b.productName),
    makeRender: ({ searchText }) => (productName) => (
      <DTCHighlighter searchText={searchText} value={productName} />
    )
  },
  [FIELDS.quantity]: {
    title: LABELS[FIELDS.quantity],
    dataIndex: FIELDS.quantity,
    key: FIELDS.quantity,
    sorter: (a, b) => a.quantity - b.quantity,
    makeRender: ({ searchText }) => (quantity) => (
      <DTCHighlighter searchText={searchText} value={quantity} />
    )
  },
  [FIELDS.unitPrice]: {
    title: LABELS[FIELDS.unitPrice],
    dataIndex: FIELDS.unitPrice,
    key: FIELDS.unitPrice,
    sorter: (a, b) => a.unitPrice - b.unitPrice,
    makeRender: ({ searchText }) => (unitPrice) => (
      <DTCHighlighter searchText={searchText} value={unitPrice} />
    )
  },
  [FIELDS.totalPrice]: {
    title: LABELS[FIELDS.totalPrice],
    dataIndex: FIELDS.totalPrice,
    key: FIELDS.totalPrice,
    sorter: (a, b) => a.totalPrice - b.totalPrice,
    makeRender: ({ searchText }) => (totalPrice) => (
      <DTCHighlighter searchText={searchText} value={totalPrice} />
    )
  },
  [FIELDS.buyerCompanyName]: {
    title: LABELS[FIELDS.buyerCompanyName],
    dataIndex: FIELDS.buyerCompanyName,
    key: FIELDS.buyerCompanyName,
    sorter: (a, b) => sortAlphabetically(a.buyerCompanyName, b.buyerCompanyName),
    makeRender: ({ searchText }) => (buyerCompanyName) => (
      <DTCHighlighter searchText={searchText} value={buyerCompanyName} />
    )
  },
  [FIELDS.sellerCompanyName]: {
    title: LABELS[FIELDS.sellerCompanyName],
    dataIndex: FIELDS.sellerCompanyName,
    key: FIELDS.sellerCompanyName,
    sorter: (a, b) => sortAlphabetically(a.sellerCompanyName, b.sellerCompanyName),
    makeRender: ({ searchText }) => (sellerCompanyName) => (
      <DTCHighlighter searchText={searchText} value={sellerCompanyName} />
    )
  },
  [FIELDS.status]: {
    title: LABELS[FIELDS.status],
    dataIndex: FIELDS.status,
    key: FIELDS.status,
    sorter: (a, b) => sortAlphabetically(a.status, b.status),
    makeRender: ({ searchText }) => (status) => (
      <DTCHighlighter searchText={searchText} value={status} />
    )
  }
});

// history tab
export const getOrderHistoryTableSchema = () => ({
  [FIELDS.timestamp]: {
    title: LABELS[FIELDS.timestamp],
    dataIndex: FIELDS.timestamp,
    key: FIELDS.timestamp,
    sorter: (a, b) => a.timeStamp - b.timeStamp,
    makeRender: ({ searchText }) => (timeStamp) => (
      <DTCHighlighter searchText={searchText} value={timeStamp || ""} />
    )
  },
  [FIELDS.orderNumber]: {
    title: LABELS[FIELDS.orderNumber],
    dataIndex: FIELDS.orderNumber,
    key: FIELDS.orderNumber,
    sorter: (a, b) => a.orderNumber - b.orderNumber,
    makeRender: ({ searchText }) => (orderNumber) => (
      <DTCHighlighter searchText={searchText} value={orderNumber} />
    )
  },
  [FIELDS.productName]: {
    title: LABELS[FIELDS.productName],
    dataIndex: FIELDS.productName,
    key: FIELDS.productName,
    sorter: (a, b) => sortAlphabetically(a.productName, b.productName),
    makeRender: ({ searchText }) => (productName) => (
      <DTCHighlighter searchText={searchText} value={productName} />
    )
  },
  [FIELDS.quantity]: {
    title: LABELS[FIELDS.quantity],
    dataIndex: FIELDS.quantity,
    key: FIELDS.quantity,
    sorter: (a, b) => a.quantity - b.quantity,
    makeRender: ({ searchText }) => (quantity) => (
      <DTCHighlighter searchText={searchText} value={quantity} />
    )
  },
  [FIELDS.unitPrice]: {
    title: LABELS[FIELDS.unitPrice],
    dataIndex: FIELDS.unitPrice,
    key: FIELDS.unitPrice,
    sorter: (a, b) => a.unitPrice - b.unitPrice,
    makeRender: ({ searchText }) => (unitPrice) => (
      <DTCHighlighter searchText={searchText} value={unitPrice} />
    )
  },
  [FIELDS.totalPrice]: {
    title: LABELS[FIELDS.totalPrice],
    dataIndex: FIELDS.totalPrice,
    key: FIELDS.totalPrice,
    sorter: (a, b) => a.totalPrice - b.totalPrice,
    makeRender: ({ searchText }) => (totalPrice) => (
      <DTCHighlighter searchText={searchText} value={totalPrice} />
    )
  },
  [FIELDS.buyerCompanyName]: {
    title: LABELS[FIELDS.buyerCompanyName],
    dataIndex: FIELDS.buyerCompanyName,
    key: FIELDS.buyerCompanyName,
    sorter: (a, b) => sortAlphabetically(a.buyerCompanyName, b.buyerCompanyName),
    makeRender: ({ searchText }) => (buyerCompanyName) => (
      <DTCHighlighter searchText={searchText} value={buyerCompanyName} />
    )
  },
  [FIELDS.sellerCompanyName]: {
    title: LABELS[FIELDS.sellerCompanyName],
    dataIndex: FIELDS.sellerCompanyName,
    key: FIELDS.sellerCompanyName,
    sorter: (a, b) => sortAlphabetically(a.sellerCompanyName, b.sellerCompanyName),
    makeRender: ({ searchText }) => (sellerCompanyName) => (
      <DTCHighlighter searchText={searchText} value={sellerCompanyName} />
    )
  },
  [FIELDS.status]: {
    title: LABELS[FIELDS.status],
    dataIndex: FIELDS.status,
    key: FIELDS.status,
    sorter: (a, b) => sortAlphabetically(a.status, b.status),
    makeRender: ({ searchText }) => (status) => (
      <DTCHighlighter searchText={searchText} value={status} />
    )
  }
});
