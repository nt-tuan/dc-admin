import React from "react";
import { sortAlphabetically, sortPrice } from "utils/sort.util";

const FIELDS = {
  timestamp: "timestamp",
  id: "id",
  accountNumber: "accountNumber",
  amount: "amount",
  currency: "currency",
  requestedDate: "requestedDate",
  processedDate: "processedDate",
  status: "status"
};

const LABELS = {
  [FIELDS.timestamp]: "Date",
  [FIELDS.id]: "Withdrawal Id",
  [FIELDS.accountNumber]: "Deposited Bank Account",
  [FIELDS.amount]: "Debit",
  [FIELDS.currency]: "Currency",
  [FIELDS.requestedDate]: "Requested Date",
  [FIELDS.processedDate]: "Processed Date",
  [FIELDS.status]: "Status"
};

export const WITHDRAWAL_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS
});

// pending withdrawal

export const pendingWithdrawalTableSchema = () => (
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
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp} />
    },
    {
      title: LABELS[FIELDS.id],
      dataIndex: FIELDS.id,
      key: FIELDS.id,
      sorter: (a, b) => a[FIELDS.id] - b[FIELDS.id],
      sortOrder: sortedInfo.columnKey === FIELDS.id && sortedInfo.order,
      render: (id) => <CustomHighlighter searchText={searchText} value={id} />
    },
    {
      title: LABELS[FIELDS.accountNumber],
      dataIndex: FIELDS.accountNumber,
      key: FIELDS.accountNumber,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.accountNumber], b[FIELDS.accountNumber]),
      sortOrder: sortedInfo.columnKey === FIELDS.accountNumber && sortedInfo.order,
      render: (accountNumber) => <CustomHighlighter searchText={searchText} value={accountNumber} />
    },
    {
      title: LABELS[FIELDS.amount],
      dataIndex: FIELDS.amount,
      key: FIELDS.amount,
      sorter: (a, b) => sortPrice(a[FIELDS.amount], b[FIELDS.amount]),
      sortOrder: sortedInfo.columnKey === FIELDS.amount && sortedInfo.order,
      render: (amount) => <CustomHighlighter searchText={searchText} value={amount} />
    },
    {
      title: LABELS[FIELDS.currency],
      dataIndex: FIELDS.currency,
      key: FIELDS.currency,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.currency], b[FIELDS.currency]),
      sortOrder: sortedInfo.columnKey === FIELDS.currency && sortedInfo.order,
      render: (currency) => <CustomHighlighter searchText={searchText} value={currency} />
    }
  ];

  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};

// history withdrawal
export const historyWithdrawalTableSchema = () => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
    {
      title: LABELS[FIELDS.requestedDate],
      dataIndex: FIELDS.requestedDate,
      key: FIELDS.requestedDate,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.requestedDate], b[FIELDS.requestedDate]),
      sortOrder: sortedInfo.columnKey === FIELDS.requestedDate && sortedInfo.order,
      render: (requestedDate) => <CustomHighlighter searchText={searchText} value={requestedDate} />
    },
    {
      title: LABELS[FIELDS.processedDate],
      dataIndex: FIELDS.processedDate,
      key: FIELDS.processedDate,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.processedDate], b[FIELDS.processedDate]),
      sortOrder: sortedInfo.columnKey === FIELDS.processedDate && sortedInfo.order,
      render: (processedDate) => <CustomHighlighter searchText={searchText} value={processedDate} />
    },
    {
      title: LABELS[FIELDS.id],
      dataIndex: FIELDS.id,
      key: FIELDS.id,
      sorter: (a, b) => a[FIELDS.id] - b[FIELDS.id],
      sortOrder: sortedInfo.columnKey === FIELDS.id && sortedInfo.order,
      render: (id) => <CustomHighlighter searchText={searchText} value={id} />
    },
    {
      title: LABELS[FIELDS.accountNumber],
      dataIndex: FIELDS.accountNumber,
      key: FIELDS.accountNumber,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.accountNumber], b[FIELDS.accountNumber]),
      sortOrder: sortedInfo.columnKey === FIELDS.accountNumber && sortedInfo.order,
      render: (accountNumber) => <CustomHighlighter searchText={searchText} value={accountNumber} />
    },
    {
      title: LABELS[FIELDS.amount],
      dataIndex: FIELDS.amount,
      key: FIELDS.amount,
      sorter: (a, b) => sortPrice(a[FIELDS.amount], b[FIELDS.amount]),
      sortOrder: sortedInfo.columnKey === FIELDS.amount && sortedInfo.order,
      render: (amount) => <CustomHighlighter searchText={searchText} value={amount} />
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
      title: LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.status], b[FIELDS.status]),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (status) => <CustomHighlighter searchText={searchText} value={status} />
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
