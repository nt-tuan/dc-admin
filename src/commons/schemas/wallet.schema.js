import React from "react";
import { sortAlphabetically, sortPrice } from "utils/sort.util";

const FIELDS = {
  timestamp: "timestamp",
  transactionType: "transactionType",
  orderNumber: "orderNumber",
  productDetails: "productDetails",
  description: "description",
  currency: "currency",
  blocked: "blocked",
  credit: "credit",
  debit: "debit",
  totalBlocked: "totalBlocked",
  availableBalance: "availableBalance",
  currentTotalBalance: "currentTotalBalance"
};

const LABELS = {
  [FIELDS.timestamp]: "Time Stamp",
  [FIELDS.transactionType]: "Transaction Type",
  [FIELDS.orderNumber]: "Order Number",
  [FIELDS.productDetails]: "Product Details",
  [FIELDS.description]: "Description",
  [FIELDS.currency]: "Currency",
  [FIELDS.blocked]: "Blocked",
  [FIELDS.credit]: "Credit",
  [FIELDS.debit]: "Debit",
  [FIELDS.totalBlocked]: "Total Blocked",
  [FIELDS.availableBalance]: "Available Balance",
  [FIELDS.currentTotalBalance]: "Current Total Balance"
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

export const WALLET_SCHEMA = Object.freeze({
  FIELDS,
  LABELS,
  BANK_DETAILS,
  BANK_DETAIL_LABELS
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
      title: LABELS[FIELDS.transactionType],
      dataIndex: FIELDS.transactionType,
      key: FIELDS.transactionType,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.transactionType], b[FIELDS.transactionType]),
      sortOrder: sortedInfo.columnKey === FIELDS.transactionType && sortedInfo.order,
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
      title: LABELS[FIELDS.currency],
      dataIndex: FIELDS.currency,
      key: FIELDS.currency,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.currency], b[FIELDS.currency]),
      sortOrder: sortedInfo.columnKey === FIELDS.currency && sortedInfo.order,
      render: (currency) => <CustomHighlighter searchText={searchText} value={currency} />
    },
    {
      title: LABELS[FIELDS.blocked],
      dataIndex: FIELDS.blocked,
      key: FIELDS.blocked,
      sorter: (a, b) => sortPrice(a[FIELDS.blocked], b[FIELDS.blocked]),
      sortOrder: sortedInfo.columnKey === FIELDS.blocked && sortedInfo.order,
      render: (blocked) => <CustomHighlighter searchText={searchText} value={blocked} />
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
      title: LABELS[FIELDS.totalBlocked],
      dataIndex: FIELDS.totalBlocked,
      key: FIELDS.totalBlocked,
      sorter: (a, b) => sortPrice(a[FIELDS.totalBlocked], b[FIELDS.totalBlocked]),
      sortOrder: sortedInfo.columnKey === FIELDS.totalBlocked && sortedInfo.order,
      render: (totalBlocked) => <CustomHighlighter searchText={searchText} value={totalBlocked} />
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
      title: LABELS[FIELDS.currentTotalBalance],
      dataIndex: FIELDS.currentTotalBalance,
      key: FIELDS.currentTotalBalance,
      sorter: (a, b) => sortPrice(a[FIELDS.currentTotalBalance], b[FIELDS.currentTotalBalance]),
      sortOrder: sortedInfo.columnKey === FIELDS.currentTotalBalance && sortedInfo.order,
      render: (currentTotalBalance) => (
        <CustomHighlighter searchText={searchText} value={currentTotalBalance} />
      )
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
