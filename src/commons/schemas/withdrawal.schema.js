import { DTCHighlighter } from "components";
import React from "react";
import { toCurrency } from "utils";
import dayjs from "dayjs";
import { DATETIME_FORMAT } from "commons/consts";
import { sortAlphabetically } from "utils/sort.util";

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

export const getPendingWithdrawalTableSchema = () => ({
  [FIELDS.timeStamp]: {
    title: LABELS[FIELDS.timeStamp],
    dataIndex: FIELDS.timeStamp,
    key: FIELDS.timeStamp,
    sorter: (a, b) => new Date(a.timeStamp) - new Date(b.timeStamp),
    makeRender: ({ searchText }) => (timeStamp) => (
      <DTCHighlighter searchText={searchText} value={dayjs(timeStamp).format(DATETIME_FORMAT)} />
    )
  },
  [FIELDS.withdrawalId]: {
    title: LABELS[FIELDS.withdrawalId],
    dataIndex: FIELDS.withdrawalId,
    key: FIELDS.withdrawalId,
    makeRender: ({ searchText }) => (withdrawalId) => (
      <DTCHighlighter searchText={searchText} value={withdrawalId} />
    )
  },
  [FIELDS.depositedAccount]: {
    title: LABELS[FIELDS.depositedAccount],
    dataIndex: FIELDS.depositedAccount,
    key: FIELDS.depositedAccount,
    makeRender: ({ searchText }) => (depositedAccount) => (
      <DTCHighlighter searchText={searchText} value={depositedAccount} />
    )
  },
  [FIELDS.debit]: {
    title: LABELS[FIELDS.debit],
    dataIndex: FIELDS.debit,
    key: FIELDS.debit,
    sorter: (a, b) => a.debit - b.debit,
    makeRender: ({ searchText }) => (debit) => (
      <DTCHighlighter searchText={searchText} value={toCurrency(debit)} />
    )
  },
  [FIELDS.currency]: {
    title: LABELS[FIELDS.currency],
    dataIndex: FIELDS.currency,
    key: FIELDS.currency,
    sorter: (a, b) => a.currency - b.currency,
    makeRender: ({ searchText }) => (currency) => (
      <DTCHighlighter searchText={searchText} value={currency} />
    )
  }
});

// history withdrawal

export const getHistoryWithdrawalTableSchema = () => ({
  [FIELDS.requestedDate]: {
    title: LABELS[FIELDS.requestedDate],
    dataIndex: FIELDS.requestedDate,
    key: FIELDS.requestedDate,
    sorter: (a, b) => new Date(a.requestedDate) - new Date(b.requestedDate),
    makeRender: ({ searchText }) => (requestedDate) => (
      <DTCHighlighter
        searchText={searchText}
        value={dayjs(requestedDate).format(DATETIME_FORMAT)}
      />
    )
  },
  [FIELDS.processedDate]: {
    title: LABELS[FIELDS.processedDate],
    dataIndex: FIELDS.processedDate,
    key: FIELDS.processedDate,
    sorter: (a, b) => new Date(a.processedDate) - new Date(b.processedDate),
    makeRender: ({ searchText }) => (processedDate) => (
      <DTCHighlighter
        searchText={searchText}
        value={dayjs(processedDate).format(DATETIME_FORMAT)}
      />
    )
  },
  [FIELDS.withdrawalId]: {
    title: LABELS[FIELDS.withdrawalId],
    dataIndex: FIELDS.withdrawalId,
    key: FIELDS.withdrawalId,
    sorter: (a, b) => a.withdrawalId - b.withdrawalId,
    makeRender: ({ searchText }) => (withdrawalId) => (
      <DTCHighlighter searchText={searchText} value={withdrawalId} />
    )
  },
  [FIELDS.depositedAccount]: {
    title: LABELS[FIELDS.depositedAccount],
    dataIndex: FIELDS.depositedAccount,
    key: FIELDS.depositedAccount,
    sorter: (a, b) => sortAlphabetically(a.depositedAccount, b.depositedAccount),
    makeRender: ({ searchText }) => (depositedAccount) => (
      <DTCHighlighter searchText={searchText} value={depositedAccount} />
    )
  },
  [FIELDS.debit]: {
    title: LABELS[FIELDS.debit],
    dataIndex: FIELDS.debit,
    key: FIELDS.debit,
    sorter: (a, b) => a.debit - b.debit,
    makeRender: ({ searchText }) => (debit) => (
      <DTCHighlighter searchText={searchText} value={toCurrency(debit)} />
    )
  },
  [FIELDS.currency]: {
    title: LABELS[FIELDS.currency],
    dataIndex: FIELDS.currency,
    key: FIELDS.currency,
    sorter: (a, b) => a.currency - b.currency,
    makeRender: ({ searchText }) => (currency) => (
      <DTCHighlighter searchText={searchText} value={currency} />
    )
  },
  [FIELDS.status]: {
    title: LABELS[FIELDS.status],
    dataIndex: FIELDS.status,
    key: FIELDS.status,
    sorter: (a, b) => a.status - b.status,
    makeRender: ({ searchText }) => (status) => (
      <DTCHighlighter searchText={searchText} value={status} />
    )
  }
});
