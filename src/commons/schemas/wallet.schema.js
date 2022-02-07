import React from "react";
import { getCompanyName } from "utils/config.util";
import { sortAlphabetically, sortPrice } from "utils/sort.util";

const FIELDS = {
  createdDate: "createdDate",
  type: "type",
  orderNumber: "orderNumber",
  productDetails: "productDetails",
  description: "description",
  currency: "currency",
  blockedFund: "blockedFund",
  credit: "credit",
  debit: "debit",
  totalBlockFund: "totalBlockFund",
  availableBalance: "availableBalance",
  currentBalance: "currentBalance"
};

const LABELS = {
  [FIELDS.createdDate]: "Timestamp",
  [FIELDS.type]: "Transaction Type",
  [FIELDS.orderNumber]: "Order Number",
  [FIELDS.productDetails]: "Product Details",
  [FIELDS.description]: "Description",
  [FIELDS.credit]: "Credit",
  [FIELDS.debit]: "Debit"
};

const BANK_DETAILS = {
  accountHolder: "accountHolder",
  bankName: "name",
  accountNumber: "accountNumber",
  iban: "iban",
  nationality: "nationality",
  swiftCode: "swiftCode"
};

const BANK_DETAIL_LABELS = {
  [BANK_DETAILS.accountHolder]: "Account holder",
  [BANK_DETAILS.bankName]: "Bank name",
  [BANK_DETAILS.accountNumber]: "Account No.",
  [BANK_DETAILS.iban]: "IBAN",
  [BANK_DETAILS.nationality]: "Nationality",
  [BANK_DETAILS.swiftCode]: "Swift Code"
};

export const WALLET_TRANSACTION_TYPES = Object.freeze({
  ORDER_PAYMENT: "ORDER_PAYMENT",
  // IVS: "IVS",
  // TSF: "TSF",
  DEPOSIT: "DEPOSIT",
  DEPOSIT_IVS: "DEPOSIT_IVS",
  BILLING_IVS: "BILLING_IVS",
  BILLING_TSF: "BILLING_TSF",
  BILLING_DC: "BILLING_DC",
  BILLING_PCC: "BILLING_PCC"
});

export const WALLET_TRANSACTION_TYPE_LABELS = Object.freeze({
  [WALLET_TRANSACTION_TYPES.ORDER_PAYMENT]: "Order Payment",
  [WALLET_TRANSACTION_TYPES.DEPOSIT]: "Deposit",
  [WALLET_TRANSACTION_TYPES.DEPOSIT_IVS]: "Deposit​",
  [WALLET_TRANSACTION_TYPES.BILLING_DC]: "Billing",
  [WALLET_TRANSACTION_TYPES.BILLING_PCC]: "Billing"
});

export const WALLET_DESCRIPTIONS = Object.freeze({
  [WALLET_TRANSACTION_TYPES.ORDER_PAYMENT]: "Order Payment",
  [WALLET_TRANSACTION_TYPES.DEPOSIT]: "Funds Deposited by User",
  [WALLET_TRANSACTION_TYPES.DEPOSIT_IVS]: "Invoice Value Settlement​",
  [WALLET_TRANSACTION_TYPES.BILLING_DC]: `${getCompanyName()} Commission`,
  [WALLET_TRANSACTION_TYPES.BILLING_PCC]: "Marketplace Commission"
});

export const WALLET_SCHEMA = Object.freeze({
  FIELDS,
  LABELS,
  BANK_DETAILS,
  BANK_DETAIL_LABELS,
  WALLET_TRANSACTION_TYPES,
  WALLET_TRANSACTION_TYPE_LABELS,
  WALLET_DESCRIPTIONS
});

export const getAccountSummarySchema = () => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
    {
      title: LABELS[FIELDS.createdDate],
      dataIndex: FIELDS.createdDate,
      key: FIELDS.createdDate,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.createdDate], b[FIELDS.createdDate]),
      sortOrder: sortedInfo.columnKey === FIELDS.createdDate && sortedInfo.order,
      render: (createdDate) => (
        <CustomHighlighter searchText={searchText} value={createdDate || ""} />
      )
    },
    {
      title: LABELS[FIELDS.type],
      dataIndex: FIELDS.type,
      key: FIELDS.type,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.type], b[FIELDS.type]),
      sortOrder: sortedInfo.columnKey === FIELDS.type && sortedInfo.order,
      render: (transactionType) => (
        <CustomHighlighter searchText={searchText} value={transactionType} />
      )
    },
    {
      title: LABELS[FIELDS.orderNumber],
      dataIndex: FIELDS.orderNumber,
      key: FIELDS.orderNumber,
      sorter: (a, b) => a[FIELDS.orderNumber] - b[FIELDS.orderNumber],
      sortOrder: sortedInfo.columnKey === FIELDS.orderNumber && sortedInfo.order,
      render: (orderNumber) => <CustomHighlighter searchText={searchText} value={orderNumber} />
    },
    {
      title: LABELS[FIELDS.productDetails],
      dataIndex: FIELDS.productDetails,
      key: FIELDS.productDetails,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productDetails], b[FIELDS.productDetails]),
      sortOrder: sortedInfo.columnKey === FIELDS.productDetails && sortedInfo.order,
      render: (productDetails) => (
        <CustomHighlighter searchText={searchText} value={productDetails} />
      )
    },
    {
      title: LABELS[FIELDS.description],
      dataIndex: FIELDS.description,
      key: FIELDS.description,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.description], b[FIELDS.description]),
      sortOrder: sortedInfo.columnKey === FIELDS.description && sortedInfo.order,
      render: (description) => <CustomHighlighter searchText={searchText} value={description} />
    },
    {
      title: LABELS[FIELDS.credit],
      dataIndex: FIELDS.credit,
      key: FIELDS.credit,
      sorter: (a, b) => sortPrice(a[FIELDS.credit], b[FIELDS.credit]),
      sortOrder: sortedInfo.columnKey === FIELDS.credit && sortedInfo.order,
      render: (credit) => <CustomHighlighter searchText={searchText} value={credit} />
    },
    {
      title: LABELS[FIELDS.debit],
      dataIndex: FIELDS.debit,
      key: FIELDS.debit,
      sorter: (a, b) => sortPrice(a[FIELDS.debit], b[FIELDS.debit]),
      sortOrder: sortedInfo.columnKey === FIELDS.debit && sortedInfo.order,
      render: (debit) => <CustomHighlighter searchText={searchText} value={debit} />
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
