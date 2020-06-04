import React from "react";
import { UtilFacade } from "utils";

const { sortAlphabetically } = UtilFacade.getSortUtils();

const FIELDS = {
  timestamp: "createdDate",
  orderNumber: "number",
  productCategory: "productCategory",
  productType: "productType",
  productBrand: "productBrand",
  productName: "productName",
  quantity: "quantity",
  unitPrice: "unitPrice",
  totalPrice: "total",
  buyerCompanyName: "buyerCompany",
  sellerCompanyName: "sellerCompany",
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
  ORDER_CANCELLED: "ORDER_CANCELLED",
  UPLOAD_SHIPPING_DOCUMENTS: "UPLOAD_SHIPPING_DOCUMENTS",
  DONE: "DONE"
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
  [ORDER_STATUS.ORDER_CANCELLED]: "Order Cancelled",
  [ORDER_STATUS.UPLOAD_SHIPPING_DOCUMENTS]: "Upload Shipping Documents",
  [ORDER_STATUS.DONE]: "Done"
};

export const ORDERS_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  ORDER_STATUS: ORDER_STATUS,
  ORDER_STATUS_LABELS: ORDER_STATUS_LABELS
});

// active tab
export const orderActiveTableSchema = () => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
    {
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a.timestamp, b.timestamp),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp || ""} />
    },
    {
      title: LABELS[FIELDS.orderNumber],
      dataIndex: FIELDS.orderNumber,
      key: FIELDS.orderNumber,
      sorter: (a, b) => a.orderNumber - b.orderNumber,
      sortOrder: sortedInfo.columnKey === FIELDS.orderNumber && sortedInfo.order,
      render: (orderNumber) => <CustomHighlighter searchText={searchText} value={orderNumber} />
    },
    {
      title: LABELS[FIELDS.productCategory],
      dataIndex: FIELDS.productCategory,
      key: FIELDS.productCategory,
      sorter: (a, b) => sortAlphabetically(a.productCategory, b.productCategory),
      sortOrder: sortedInfo.columnKey === FIELDS.productCategory && sortedInfo.order,
      render: (productCategory) => (
        <CustomHighlighter searchText={searchText} value={productCategory} />
      )
    },
    {
      title: LABELS[FIELDS.productType],
      dataIndex: FIELDS.productType,
      key: FIELDS.productType,
      sorter: (a, b) => sortAlphabetically(a.productType, b.productType),
      sortOrder: sortedInfo.columnKey === FIELDS.productType && sortedInfo.order,
      render: (productType) => <CustomHighlighter searchText={searchText} value={productType} />
    },
    {
      title: LABELS[FIELDS.productBrand],
      dataIndex: FIELDS.productBrand,
      key: FIELDS.productBrand,
      sorter: (a, b) => sortAlphabetically(a.productBrand, b.productBrand),
      sortOrder: sortedInfo.columnKey === FIELDS.productBrand && sortedInfo.order,
      render: (productBrand) => <CustomHighlighter searchText={searchText} value={productBrand} />
    },
    {
      title: LABELS[FIELDS.productName],
      dataIndex: FIELDS.productName,
      key: FIELDS.productName,
      sorter: (a, b) => sortAlphabetically(a.productName, b.productName),
      sortOrder: sortedInfo.columnKey === FIELDS.productName && sortedInfo.order,
      render: (productName) => <CustomHighlighter searchText={searchText} value={productName} />
    },
    {
      title: LABELS[FIELDS.quantity],
      dataIndex: FIELDS.quantity,
      key: FIELDS.quantity,
      sorter: (a, b) => a.quantity - b.quantity,
      sortOrder: sortedInfo.columnKey === FIELDS.quantity && sortedInfo.order,
      render: (quantity) => <CustomHighlighter searchText={searchText} value={quantity} />
    },
    {
      title: LABELS[FIELDS.unitPrice],
      dataIndex: FIELDS.unitPrice,
      key: FIELDS.unitPrice,
      sorter: (a, b) => a.unitPrice - b.unitPrice,
      sortOrder: sortedInfo.columnKey === FIELDS.unitPrice && sortedInfo.order,
      render: (unitPrice) => <CustomHighlighter searchText={searchText} value={unitPrice} />
    },
    {
      title: LABELS[FIELDS.totalPrice],
      dataIndex: FIELDS.totalPrice,
      key: FIELDS.totalPrice,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortOrder: sortedInfo.columnKey === FIELDS.totalPrice && sortedInfo.order,
      render: (totalPrice) => <CustomHighlighter searchText={searchText} value={totalPrice} />
    },
    {
      title: LABELS[FIELDS.buyerCompanyName],
      dataIndex: FIELDS.buyerCompanyName,
      key: FIELDS.buyerCompanyName,
      sorter: (a, b) => sortAlphabetically(a.buyerCompanyName, b.buyerCompanyName),
      sortOrder: sortedInfo.columnKey === FIELDS.buyerCompanyName && sortedInfo.order,
      render: (buyerCompanyName) => (
        <CustomHighlighter searchText={searchText} value={buyerCompanyName} />
      )
    },
    {
      title: LABELS[FIELDS.sellerCompanyName],
      dataIndex: FIELDS.sellerCompanyName,
      key: FIELDS.sellerCompanyName,
      sorter: (a, b) => sortAlphabetically(a.sellerCompanyName, b.sellerCompanyName),
      sortOrder: sortedInfo.columnKey === FIELDS.sellerCompanyName && sortedInfo.order,
      render: (sellerCompanyName) => (
        <CustomHighlighter searchText={searchText} value={sellerCompanyName} />
      )
    },
    {
      title: LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a.status, b.status),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (status) => <CustomHighlighter searchText={searchText} value={status} />
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};

// history tab
export const orderHistoryTableSchema = () => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
    {
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a.timestamp, b.timestamp),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp || ""} />
    },
    {
      title: LABELS[FIELDS.orderNumber],
      dataIndex: FIELDS.orderNumber,
      key: FIELDS.orderNumber,
      sorter: (a, b) => a.orderNumber - b.orderNumber,
      sortOrder: sortedInfo.columnKey === FIELDS.orderNumber && sortedInfo.order,
      render: (orderNumber) => <CustomHighlighter searchText={searchText} value={orderNumber} />
    },
    {
      title: LABELS[FIELDS.productName],
      dataIndex: FIELDS.productName,
      key: FIELDS.productName,
      sorter: (a, b) => sortAlphabetically(a.productName, b.productName),
      sortOrder: sortedInfo.columnKey === FIELDS.productName && sortedInfo.order,
      render: (productName) => <CustomHighlighter searchText={searchText} value={productName} />
    },
    {
      title: LABELS[FIELDS.quantity],
      dataIndex: FIELDS.quantity,
      key: FIELDS.quantity,
      sorter: (a, b) => a.quantity - b.quantity,
      sortOrder: sortedInfo.columnKey === FIELDS.quantity && sortedInfo.order,
      render: (quantity) => <CustomHighlighter searchText={searchText} value={quantity} />
    },
    {
      title: LABELS[FIELDS.unitPrice],
      dataIndex: FIELDS.unitPrice,
      key: FIELDS.unitPrice,
      sorter: (a, b) => a.unitPrice - b.unitPrice,
      sortOrder: sortedInfo.columnKey === FIELDS.unitPrice && sortedInfo.order,
      render: (unitPrice) => <CustomHighlighter searchText={searchText} value={unitPrice} />
    },
    {
      title: LABELS[FIELDS.totalPrice],
      dataIndex: FIELDS.totalPrice,
      key: FIELDS.totalPrice,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortOrder: sortedInfo.columnKey === FIELDS.totalPrice && sortedInfo.order,
      render: (totalPrice) => <CustomHighlighter searchText={searchText} value={totalPrice} />
    },
    {
      title: LABELS[FIELDS.buyerCompanyName],
      dataIndex: FIELDS.buyerCompanyName,
      key: FIELDS.buyerCompanyName,
      sorter: (a, b) => sortAlphabetically(a.buyerCompanyName, b.buyerCompanyName),
      sortOrder: sortedInfo.columnKey === FIELDS.buyerCompanyName && sortedInfo.order,
      render: (buyerCompanyName) => (
        <CustomHighlighter searchText={searchText} value={buyerCompanyName} />
      )
    },
    {
      title: LABELS[FIELDS.sellerCompanyName],
      dataIndex: FIELDS.sellerCompanyName,
      key: FIELDS.sellerCompanyName,
      sorter: (a, b) => sortAlphabetically(a.sellerCompanyName, b.sellerCompanyName),
      sortOrder: sortedInfo.columnKey === FIELDS.sellerCompanyName && sortedInfo.order,
      render: (sellerCompanyName) => (
        <CustomHighlighter searchText={searchText} value={sellerCompanyName} />
      )
    },
    {
      title: LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a.status, b.status),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (status) => <CustomHighlighter searchText={searchText} value={status} />
    }
  ];

  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
