import React from "react";
import { sortAlphabetically } from "utils/sort.util";
import { toCurrency } from "utils/general.util";
import { Button, Switch } from "antd";
import { Link } from "react-router-dom";
import { RouteConst } from "commons/consts";

const REQUEST_STATUS = {
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED"
};

const REQUEST_STATUS_LABELS = {
  [REQUEST_STATUS.ACCEPTED]: "Accepted",
  [REQUEST_STATUS.REJECTED]: "Rejected"
};

const FIELDS = {
  timestamp: "createdDate",
  orderNumber: "number",
  buyerCompanyName: "companyName",
  productCategory: "productCategory",
  productType: "productType",
  productBrand: "productBrand",
  productName: "productName",
  quantity: "quantity",
  unitPrice: "unitPrice",
  totalPrice: "totalPrice",
  creditTerms: "creditTerms",
  paymentOverdue: "paymentOverdue",
  paymentDueDate: "paymentDueDate",
  status: "status",
  reputationScore: "reputation",
  numberOfCreditRequest: "numberOfCreditRequest",
  numberOfCreditAccepted: "numberOfCreditAccepted",
  numberOfCreditRejected: "numberOfCreditRejected",
  numberOfLatePayments: "numberOfLatePayment",
  numberOfOnTimePayments: "numberOfOnTimePayment"
};

const LABELS = {
  [FIELDS.timestamp]: "Order Created",
  [FIELDS.orderNumber]: "Order Number",
  [FIELDS.buyerCompanyName]: "Buyer Company Name",
  [FIELDS.productCategory]: "Product Category",
  [FIELDS.productType]: "Product Type",
  [FIELDS.productBrand]: "Product Brand",
  [FIELDS.productName]: "Product Name",
  [FIELDS.quantity]: "Quantity",
  [FIELDS.unitPrice]: "Unit Price",
  [FIELDS.totalPrice]: "Total Price",
  [FIELDS.creditTerms]: "Credit Terms",
  [FIELDS.paymentOverdue]: "Credit Overdue",
  [FIELDS.paymentDueDate]: "Credit Due Date",
  [FIELDS.status]: "Status",
  [FIELDS.reputationScore]: "Reputation Score",
  [FIELDS.numberOfCreditRequest]: "Number of Marketplace credits requested",
  [FIELDS.numberOfCreditAccepted]: "Number of Marketplace credits accepted",
  [FIELDS.numberOfCreditRejected]: "Number of Marketplace credits rejected",
  [FIELDS.numberOfLatePayments]: "Number of Late Payments",
  [FIELDS.numberOfOnTimePayments]: "Number of On Time Payments"
};

export const MARKETPLACE_CREDIT_SCHEMA = Object.freeze({
  FIELDS,
  LABELS
});

export const creditRequestSchema = (onAccept, onReject) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const schema = [
    {
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.timestamp], b[FIELDS.timestamp]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp} />
    },
    {
      title: LABELS[FIELDS.orderNumber],
      dataIndex: FIELDS.orderNumber,
      key: FIELDS.orderNumber,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.orderNumber], b[FIELDS.orderNumber]),
      sortOrder: sortedInfo.columnKey === FIELDS.orderNumber && sortedInfo.order,
      render: (orderNumber) => <CustomHighlighter searchText={searchText} value={orderNumber} />
    },
    {
      title: LABELS[FIELDS.buyerCompanyName],
      dataIndex: FIELDS.buyerCompanyName,
      key: FIELDS.buyerCompanyName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.buyerCompanyName], b[FIELDS.buyerCompanyName]),
      sortOrder: sortedInfo.columnKey === FIELDS.buyerCompanyName && sortedInfo.order,
      render: (buyerCompanyName) => (
        <CustomHighlighter searchText={searchText} value={buyerCompanyName} />
      )
    },
    {
      title: LABELS[FIELDS.productCategory],
      dataIndex: FIELDS.productCategory,
      key: FIELDS.productCategory,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productCategory], b[FIELDS.productCategory]),
      sortOrder: sortedInfo.columnKey === FIELDS.productCategory && sortedInfo.order,
      render: (productCategory) => (
        <CustomHighlighter searchText={searchText} value={productCategory || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productType],
      dataIndex: FIELDS.productType,
      key: FIELDS.productType,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productType], b[FIELDS.productType]),
      sortOrder: sortedInfo.columnKey === FIELDS.productType && sortedInfo.order,
      render: (productType) => (
        <CustomHighlighter searchText={searchText} value={productType || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productBrand],
      dataIndex: FIELDS.productBrand,
      key: FIELDS.productBrand,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productBrand], b[FIELDS.productBrand]),
      sortOrder: sortedInfo.columnKey === FIELDS.productBrand && sortedInfo.order,
      render: (productBrand) => (
        <CustomHighlighter searchText={searchText} value={productBrand || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productName],
      dataIndex: FIELDS.productName,
      key: FIELDS.productName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productName], b[FIELDS.productName]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (productName) => (
        <CustomHighlighter searchText={searchText} value={productName || ""} />
      )
    },
    {
      title: LABELS[FIELDS.quantity],
      dataIndex: FIELDS.quantity,
      key: FIELDS.quantity,
      sorter: (a, b) => a[FIELDS.quantity] - b[FIELDS.quantity],
      sortOrder: sortedInfo.columnKey === FIELDS.quantity && sortedInfo.order,
      render: (quantity) => <CustomHighlighter searchText={searchText} value={quantity || ""} />
    },
    {
      title: LABELS[FIELDS.unitPrice],
      dataIndex: FIELDS.unitPrice,
      key: FIELDS.unitPrice,
      sorter: (a, b) => a[FIELDS.unitPrice] - b[FIELDS.unitPrice],
      sortOrder: sortedInfo.columnKey === FIELDS.unitPrice && sortedInfo.order,
      render: (unitPrice) => (
        <CustomHighlighter searchText={searchText} value={unitPrice ? toCurrency(unitPrice) : ""} />
      )
    },
    {
      title: LABELS[FIELDS.totalPrice],
      dataIndex: FIELDS.totalPrice,
      key: FIELDS.totalPrice,
      sorter: (a, b) => a[FIELDS.totalPrice] - b[FIELDS.totalPrice],
      sortOrder: sortedInfo.columnKey === FIELDS.totalPrice && sortedInfo.order,
      render: (totalPrice) => (
        <CustomHighlighter searchText={searchText} value={toCurrency(totalPrice)} />
      )
    },
    {
      title: LABELS[FIELDS.creditTerms],
      dataIndex: FIELDS.creditTerms,
      key: FIELDS.creditTerms,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.creditTerms], b[FIELDS.creditTerms]),
      sortOrder: sortedInfo.columnKey === FIELDS.creditTerms && sortedInfo.order,
      render: (creditTerms) => (
        <CustomHighlighter
          searchText={searchText}
          value={creditTerms ? `In ${creditTerms} days` : ""}
        />
      )
    },
    {
      title: LABELS[FIELDS.paymentOverdue],
      dataIndex: FIELDS.paymentOverdue,
      key: FIELDS.paymentOverdue,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.paymentOverdue], b[FIELDS.paymentOverdue]),
      sortOrder: sortedInfo.columnKey === FIELDS.paymentOverdue && sortedInfo.order,
      render: (paymentOverdue) => (
        <CustomHighlighter searchText={searchText} value={paymentOverdue || ""} />
      )
    },
    {
      title: "Manage",
      key: "manage",
      render: ({ id }) => (
        <div className="d-flex">
          <Button title="Accept" onClick={() => onAccept(id)}>
            <i className="fe fe-check text-success" />
          </Button>
          <Button title="Reject" className="mx-2" onClick={() => onReject(id)}>
            <i className="fe fe-x text-danger" />
          </Button>
          <div title="View purchase order">
            <Link to={`${RouteConst.PURCHASE_ORDER}?oid=${id}`}>
              {/* <Link to="/"> */}
              <Button>
                <i className="fe fe-file text-primary" />
              </Button>
            </Link>
          </div>
        </div>
      )
    }
  ];
  return schema.filter((col) => !hiddenColumns.includes(col.key));
};
export const creditHistorySchema = () => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const schema = [
    {
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.timestamp], b[FIELDS.timestamp]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp} />
    },
    {
      title: LABELS[FIELDS.orderNumber],
      dataIndex: FIELDS.orderNumber,
      key: FIELDS.orderNumber,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.orderNumber], b[FIELDS.orderNumber]),
      sortOrder: sortedInfo.columnKey === FIELDS.orderNumber && sortedInfo.order,
      render: (orderNumber) => <CustomHighlighter searchText={searchText} value={orderNumber} />
    },
    {
      title: LABELS[FIELDS.buyerCompanyName],
      dataIndex: FIELDS.buyerCompanyName,
      key: FIELDS.buyerCompanyName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.buyerCompanyName], b[FIELDS.buyerCompanyName]),
      sortOrder: sortedInfo.columnKey === FIELDS.buyerCompanyName && sortedInfo.order,
      render: (buyerCompanyName) => (
        <CustomHighlighter searchText={searchText} value={buyerCompanyName} />
      )
    },
    {
      title: LABELS[FIELDS.productCategory],
      dataIndex: FIELDS.productCategory,
      key: FIELDS.productCategory,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productCategory], b[FIELDS.productCategory]),
      sortOrder: sortedInfo.columnKey === FIELDS.productCategory && sortedInfo.order,
      render: (productCategory) => (
        <CustomHighlighter searchText={searchText} value={productCategory || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productType],
      dataIndex: FIELDS.productType,
      key: FIELDS.productType,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productType], b[FIELDS.productType]),
      sortOrder: sortedInfo.columnKey === FIELDS.productType && sortedInfo.order,
      render: (productType) => (
        <CustomHighlighter searchText={searchText} value={productType || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productBrand],
      dataIndex: FIELDS.productBrand,
      key: FIELDS.productBrand,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productBrand], b[FIELDS.productBrand]),
      sortOrder: sortedInfo.columnKey === FIELDS.productBrand && sortedInfo.order,
      render: (productBrand) => (
        <CustomHighlighter searchText={searchText} value={productBrand || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productName],
      dataIndex: FIELDS.productName,
      key: FIELDS.productName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productName], b[FIELDS.productName]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (productName) => (
        <CustomHighlighter searchText={searchText} value={productName || ""} />
      )
    },
    {
      title: LABELS[FIELDS.quantity],
      dataIndex: FIELDS.quantity,
      key: FIELDS.quantity,
      sorter: (a, b) => a[FIELDS.quantity] - b[FIELDS.quantity],
      sortOrder: sortedInfo.columnKey === FIELDS.quantity && sortedInfo.order,
      render: (quantity) => <CustomHighlighter searchText={searchText} value={quantity || ""} />
    },
    {
      title: LABELS[FIELDS.unitPrice],
      dataIndex: FIELDS.unitPrice,
      key: FIELDS.unitPrice,
      sorter: (a, b) => a[FIELDS.unitPrice] - b[FIELDS.unitPrice],
      sortOrder: sortedInfo.columnKey === FIELDS.unitPrice && sortedInfo.order,
      render: (unitPrice) => (
        <CustomHighlighter searchText={searchText} value={unitPrice ? toCurrency(unitPrice) : ""} />
      )
    },
    {
      title: LABELS[FIELDS.totalPrice],
      dataIndex: FIELDS.totalPrice,
      key: FIELDS.totalPrice,
      sorter: (a, b) => a[FIELDS.totalPrice] - b[FIELDS.totalPrice],
      sortOrder: sortedInfo.columnKey === FIELDS.totalPrice && sortedInfo.order,
      render: (totalPrice) => (
        <CustomHighlighter searchText={searchText} value={toCurrency(totalPrice)} />
      )
    },
    {
      title: LABELS[FIELDS.creditTerms],
      dataIndex: FIELDS.creditTerms,
      key: FIELDS.creditTerms,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.creditTerms], b[FIELDS.creditTerms]),
      sortOrder: sortedInfo.columnKey === FIELDS.creditTerms && sortedInfo.order,
      render: (creditTerms) => (
        <CustomHighlighter
          searchText={searchText}
          value={creditTerms ? `In ${creditTerms} days` : ""}
        />
      )
    },
    {
      title: LABELS[FIELDS.paymentOverdue],
      dataIndex: FIELDS.paymentOverdue,
      key: FIELDS.paymentOverdue,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.paymentOverdue], b[FIELDS.paymentOverdue]),
      sortOrder: sortedInfo.columnKey === FIELDS.paymentOverdue && sortedInfo.order,
      render: (paymentOverdue) => (
        <CustomHighlighter searchText={searchText} value={paymentOverdue || ""} />
      )
    },
    {
      title: LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.status], b[FIELDS.status]),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (status) => (
        <CustomHighlighter
          searchText={searchText}
          value={REQUEST_STATUS_LABELS[REQUEST_STATUS[status]]}
        />
      )
    }
  ];
  return schema.filter((col) => !hiddenColumns.includes(col.key));
};

export const creditStatusSchema = (isActive) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const schema = [
    {
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.timestamp], b[FIELDS.timestamp]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp} />
    },
    {
      title: LABELS[FIELDS.orderNumber],
      dataIndex: FIELDS.orderNumber,
      key: FIELDS.orderNumber,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.orderNumber], b[FIELDS.orderNumber]),
      sortOrder: sortedInfo.columnKey === FIELDS.orderNumber && sortedInfo.order,
      render: (orderNumber) => <CustomHighlighter searchText={searchText} value={orderNumber} />
    },
    {
      title: LABELS[FIELDS.buyerCompanyName],
      dataIndex: FIELDS.buyerCompanyName,
      key: FIELDS.buyerCompanyName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.buyerCompanyName], b[FIELDS.buyerCompanyName]),
      sortOrder: sortedInfo.columnKey === FIELDS.buyerCompanyName && sortedInfo.order,
      render: (buyerCompanyName) => (
        <CustomHighlighter searchText={searchText} value={buyerCompanyName} />
      )
    },
    {
      title: LABELS[FIELDS.productCategory],
      dataIndex: FIELDS.productCategory,
      key: FIELDS.productCategory,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productCategory], b[FIELDS.productCategory]),
      sortOrder: sortedInfo.columnKey === FIELDS.productCategory && sortedInfo.order,
      render: (productCategory) => (
        <CustomHighlighter searchText={searchText} value={productCategory || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productType],
      dataIndex: FIELDS.productType,
      key: FIELDS.productType,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productType], b[FIELDS.productType]),
      sortOrder: sortedInfo.columnKey === FIELDS.productType && sortedInfo.order,
      render: (productType) => (
        <CustomHighlighter searchText={searchText} value={productType || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productBrand],
      dataIndex: FIELDS.productBrand,
      key: FIELDS.productBrand,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productBrand], b[FIELDS.productBrand]),
      sortOrder: sortedInfo.columnKey === FIELDS.productBrand && sortedInfo.order,
      render: (productBrand) => (
        <CustomHighlighter searchText={searchText} value={productBrand || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productName],
      dataIndex: FIELDS.productName,
      key: FIELDS.productName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productName], b[FIELDS.productName]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (productName) => (
        <CustomHighlighter searchText={searchText} value={productName || ""} />
      )
    },
    {
      title: LABELS[FIELDS.quantity],
      dataIndex: FIELDS.quantity,
      key: FIELDS.quantity,
      sorter: (a, b) => a[FIELDS.quantity] - b[FIELDS.quantity],
      sortOrder: sortedInfo.columnKey === FIELDS.quantity && sortedInfo.order,
      render: (quantity) => <CustomHighlighter searchText={searchText} value={quantity || ""} />
    },
    {
      title: LABELS[FIELDS.unitPrice],
      dataIndex: FIELDS.unitPrice,
      key: FIELDS.unitPrice,
      sorter: (a, b) => a[FIELDS.unitPrice] - b[FIELDS.unitPrice],
      sortOrder: sortedInfo.columnKey === FIELDS.unitPrice && sortedInfo.order,
      render: (unitPrice) => (
        <CustomHighlighter searchText={searchText} value={unitPrice ? toCurrency(unitPrice) : ""} />
      )
    },
    {
      title: LABELS[FIELDS.totalPrice],
      dataIndex: FIELDS.totalPrice,
      key: FIELDS.totalPrice,
      sorter: (a, b) => a[FIELDS.totalPrice] - b[FIELDS.totalPrice],
      sortOrder: sortedInfo.columnKey === FIELDS.totalPrice && sortedInfo.order,
      render: (totalPrice) => (
        <CustomHighlighter searchText={searchText} value={toCurrency(totalPrice)} />
      )
    },
    {
      title: LABELS[FIELDS.creditTerms],
      dataIndex: FIELDS.creditTerms,
      key: FIELDS.creditTerms,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.creditTerms], b[FIELDS.creditTerms]),
      sortOrder: sortedInfo.columnKey === FIELDS.creditTerms && sortedInfo.order,
      render: (creditTerms) => (
        <CustomHighlighter
          searchText={searchText}
          value={creditTerms ? `In ${creditTerms} days` : ""}
        />
      )
    },
    {
      title: LABELS[FIELDS.paymentOverdue],
      dataIndex: FIELDS.paymentOverdue,
      key: FIELDS.paymentOverdue,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.paymentOverdue], b[FIELDS.paymentOverdue]),
      sortOrder: sortedInfo.columnKey === FIELDS.paymentOverdue && sortedInfo.order,
      render: (paymentOverdue) => (
        <CustomHighlighter searchText={searchText} value={paymentOverdue || ""} />
      )
    },
    {
      title: LABELS[FIELDS.paymentDueDate],
      dataIndex: FIELDS.paymentDueDate,
      key: FIELDS.paymentDueDate,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.paymentDueDate], b[FIELDS.paymentDueDate]),
      sortOrder: sortedInfo.columnKey === FIELDS.paymentDueDate && sortedInfo.order,
      render: (paymentDueDate) => (
        <CustomHighlighter searchText={searchText} value={paymentDueDate || ""} />
      )
    },
    {
      title: LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.status], b[FIELDS.status]),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: () => (
        <CustomHighlighter searchText={searchText} value={isActive ? "In progress" : "Completed"} />
      )
    }
  ];
  return schema.filter((col) => !hiddenColumns.includes(col.key));
};

export const creditUserSchema = (onHandleMarketplaceCredit) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const schema = [
    {
      title: LABELS[FIELDS.buyerCompanyName],
      dataIndex: FIELDS.buyerCompanyName,
      key: FIELDS.buyerCompanyName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.buyerCompanyName], b[FIELDS.buyerCompanyName]),
      sortOrder: sortedInfo.columnKey === FIELDS.buyerCompanyName && sortedInfo.order,
      render: (buyerCompanyName) => (
        <CustomHighlighter searchText={searchText} value={buyerCompanyName} />
      )
    },
    {
      title: LABELS[FIELDS.reputationScore],
      dataIndex: FIELDS.reputationScore,
      key: FIELDS.reputationScore,
      sorter: (a, b) => a[FIELDS.reputationScore] - b[FIELDS.reputationScore],
      sortOrder: sortedInfo.columnKey === FIELDS.reputationScore && sortedInfo.order,
      render: (reputationScore) => (
        <CustomHighlighter searchText={searchText} value={`${reputationScore}`} />
      )
    },
    {
      title: LABELS[FIELDS.numberOfCreditRequest],
      dataIndex: FIELDS.numberOfCreditRequest,
      key: FIELDS.numberOfCreditRequest,
      sorter: (a, b) => a[FIELDS.numberOfCreditRequest] - b[FIELDS.numberOfCreditRequest],
      sortOrder: sortedInfo.columnKey === FIELDS.numberOfCreditRequest && sortedInfo.order,
      render: (numberOfCreditRequest) => (
        <CustomHighlighter searchText={searchText} value={`${numberOfCreditRequest}`} />
      )
    },
    {
      title: LABELS[FIELDS.numberOfCreditAccepted],
      dataIndex: FIELDS.numberOfCreditAccepted,
      key: FIELDS.numberOfCreditAccepted,
      sorter: (a, b) => a[FIELDS.numberOfCreditAccepted] - b[FIELDS.numberOfCreditAccepted],
      sortOrder: sortedInfo.columnKey === FIELDS.numberOfCreditAccepted && sortedInfo.order,
      render: (numberOfCreditAccepted) => (
        <CustomHighlighter searchText={searchText} value={`${numberOfCreditAccepted}`} />
      )
    },
    {
      title: LABELS[FIELDS.numberOfCreditRejected],
      dataIndex: FIELDS.numberOfCreditRejected,
      key: FIELDS.numberOfCreditRejected,
      sorter: (a, b) => a[FIELDS.numberOfCreditRejected] - b[FIELDS.numberOfCreditRejected],
      sortOrder: sortedInfo.columnKey === FIELDS.numberOfCreditRejected && sortedInfo.order,
      render: (numberOfCreditRejected) => (
        <CustomHighlighter searchText={searchText} value={`${numberOfCreditRejected}`} />
      )
    },
    {
      title: LABELS[FIELDS.numberOfLatePayments],
      dataIndex: FIELDS.numberOfLatePayments,
      key: FIELDS.numberOfLatePayments,
      sorter: (a, b) => a[FIELDS.numberOfLatePayments] - b[FIELDS.numberOfLatePayments],
      sortOrder: sortedInfo.columnKey === FIELDS.numberOfLatePayments && sortedInfo.order,
      render: (numberOfLatePayments) => (
        <CustomHighlighter searchText={searchText} value={`${numberOfLatePayments}`} />
      )
    },
    {
      title: LABELS[FIELDS.numberOfOnTimePayments],
      dataIndex: FIELDS.numberOfOnTimePayments,
      key: FIELDS.numberOfOnTimePayments,
      sorter: (a, b) => a[FIELDS.numberOfOnTimePayments] - b[FIELDS.numberOfOnTimePayments],
      sortOrder: sortedInfo.columnKey === FIELDS.numberOfOnTimePayments && sortedInfo.order,
      render: (numberOfOnTimePayments) => (
        <CustomHighlighter searchText={searchText} value={`${numberOfOnTimePayments}`} />
      )
    },
    {
      title: LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.status], b[FIELDS.status]),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (status) => <CustomHighlighter searchText={searchText} value={status} />
    },
    {
      title: "Manage",
      key: "manage",
      render: ({ id, status }) => (
        <Switch
          checked={status === "Disabled" ? false : true}
          onChange={() => onHandleMarketplaceCredit(id, status === "Disabled" ? true : false)}
        />
      )
    }
  ];
  return schema.filter((col) => !hiddenColumns.includes(col.key));
};
