import React from "react";
import { sortAlphabetically, sortPrice } from "utils/sort.util";

const FIELDS = {
  timeStamp: "timeStamp",
  withdrawalId: "withdrawalId",
  depositedAccount: "depositedAccount",
  debit: "debit",
  currency: "currency",
  requestedDate: "requestedDate",
  processedDate: "processedDate",
  status: "status"
};

const LABELS = {
  [FIELDS.timeStamp]: "Date",
  [FIELDS.withdrawalId]: "Withdrawal Id",
  [FIELDS.depositedAccount]: "Deposited Account",
  [FIELDS.debit]: "Debit",
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
      title: LABELS[FIELDS.timeStamp],
      dataIndex: FIELDS.timeStamp,
      key: FIELDS.timeStamp,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.timeStamp], b[FIELDS.timeStamp]),
      sortOrder: sortedInfo.columnKey === FIELDS.timeStamp && sortedInfo.order,
      render: (timeStamp) => <CustomHighlighter searchText={searchText} value={timeStamp} />
    },
    {
      title: LABELS[FIELDS.withdrawalId],
      dataIndex: FIELDS.withdrawalId,
      key: FIELDS.withdrawalId,
      sorter: (a, b) => a[FIELDS.withdrawalId] - b[FIELDS.withdrawalId],
      sortOrder: sortedInfo.columnKey === FIELDS.withdrawalId && sortedInfo.order,
      render: (withdrawalId) => <CustomHighlighter searchText={searchText} value={withdrawalId} />
    },
    {
      title: LABELS[FIELDS.depositedAccount],
      dataIndex: FIELDS.depositedAccount,
      key: FIELDS.depositedAccount,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.depositedAccount], b[FIELDS.depositedAccount]),
      sortOrder: sortedInfo.columnKey === FIELDS.depositedAccount && sortedInfo.order,
      render: (depositedAccount) => (
        <CustomHighlighter searchText={searchText} value={depositedAccount} />
      )
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
      title: LABELS[FIELDS.withdrawalId],
      dataIndex: FIELDS.withdrawalId,
      key: FIELDS.withdrawalId,
      sorter: (a, b) => a[FIELDS.withdrawalId] - b[FIELDS.withdrawalId],
      sortOrder: sortedInfo.columnKey === FIELDS.withdrawalId && sortedInfo.order,
      render: (withdrawalId) => <CustomHighlighter searchText={searchText} value={withdrawalId} />
    },
    {
      title: LABELS[FIELDS.depositedAccount],
      dataIndex: FIELDS.depositedAccount,
      key: FIELDS.depositedAccount,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.depositedAccount], b[FIELDS.depositedAccount]),
      sortOrder: sortedInfo.columnKey === FIELDS.depositedAccount && sortedInfo.order,
      render: (depositedAccount) => (
        <CustomHighlighter searchText={searchText} value={depositedAccount} />
      )
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
