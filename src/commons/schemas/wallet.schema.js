import React from "react";
import { sortAlphabetically, sortPrice } from "utils/sort.util";

const FIELDS = {
  timestamp: "timestamp",
  type: "type",
  number: "number",
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
  [FIELDS.timestamp]: "Time Stamp",
  [FIELDS.type]: "Transaction Type",
  [FIELDS.number]: "Order Number",
  [FIELDS.productDetails]: "Product Details",
  [FIELDS.description]: "Description",
  [FIELDS.currency]: "Currency",
  [FIELDS.blockedFund]: "Blocked",
  [FIELDS.credit]: "Credit",
  [FIELDS.debit]: "Debit",
  [FIELDS.totalBlockFund]: "Total Blocked",
  [FIELDS.availableBalance]: "Available Balance",
  [FIELDS.currentBalance]: "Current Total Balance"
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
  [WALLET_TRANSACTION_TYPES.BILLING_DC]: `${process.env.REACT_APP_COMPANY_NAME} Commission`,
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
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.timestamp], b[FIELDS.timestamp]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp || ""} />
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
      title: LABELS[FIELDS.number],
      dataIndex: FIELDS.number,
      key: FIELDS.number,
      sorter: (a, b) => a[FIELDS.number] - b[FIELDS.number],
      sortOrder: sortedInfo.columnKey === FIELDS.number && sortedInfo.order,
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
      title: LABELS[FIELDS.currency],
      dataIndex: FIELDS.currency,
      key: FIELDS.currency,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.currency], b[FIELDS.currency]),
      sortOrder: sortedInfo.columnKey === FIELDS.currency && sortedInfo.order,
      render: (currency) => <CustomHighlighter searchText={searchText} value={currency} />
    },
    {
      title: LABELS[FIELDS.blockedFund],
      dataIndex: FIELDS.blockedFund,
      key: FIELDS.blockedFund,
      sorter: (a, b) => sortPrice(a[FIELDS.blockedFund], b[FIELDS.blockedFund]),
      sortOrder: sortedInfo.columnKey === FIELDS.blockedFund && sortedInfo.order,
      render: (blockedFund) => <CustomHighlighter searchText={searchText} value={blockedFund} />
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
    },
    {
      title: LABELS[FIELDS.totalBlockFund],
      dataIndex: FIELDS.totalBlockFund,
      key: FIELDS.totalBlockFund,
      sorter: (a, b) => sortPrice(a[FIELDS.totalBlockFund], b[FIELDS.totalBlockFund]),
      sortOrder: sortedInfo.columnKey === FIELDS.totalBlockFund && sortedInfo.order,
      render: (totalBlockFund) => (
        <CustomHighlighter searchText={searchText} value={totalBlockFund} />
      )
    },
    {
      title: LABELS[FIELDS.availableBalance],
      dataIndex: FIELDS.availableBalance,
      key: FIELDS.availableBalance,
      sorter: (a, b) => sortPrice(a[FIELDS.availableBalance], b[FIELDS.availableBalance]),
      sortOrder: sortedInfo.columnKey === FIELDS.availableBalance && sortedInfo.order,
      render: (availableBalance) => (
        <CustomHighlighter searchText={searchText} value={availableBalance} />
      )
    },
    {
      title: LABELS[FIELDS.currentBalance],
      dataIndex: FIELDS.currentBalance,
      key: FIELDS.currentBalance,
      sorter: (a, b) => sortPrice(a[FIELDS.currentBalance], b[FIELDS.currentBalance]),
      sortOrder: sortedInfo.columnKey === FIELDS.currentBalance && sortedInfo.order,
      render: (currentBalance) => (
        <CustomHighlighter searchText={searchText} value={currentBalance} />
      )
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
