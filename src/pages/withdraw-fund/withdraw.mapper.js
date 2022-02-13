import { toCurrency, toNumber } from "utils/general.util";

import { DatetimeUtils } from "utils/date-time.util";
import { WITHDRAWAL_SCHEMA } from "./withdrawal.schema";

const { FIELDS, LABELS } = WITHDRAWAL_SCHEMA;
const { formatDateTime } = DatetimeUtils;

const parseWithdrawHistoryToExcel = (withdraw) => {
  if (!Array.isArray(withdraw) || withdraw.length <= 0) {
    return [];
  }

  const columns = {
    [FIELDS.requestedDate]: 0,
    [FIELDS.processedDate]: 1,
    [FIELDS.id]: 2,
    [FIELDS.accountNumber]: 3,
    [FIELDS.amount]: 4,
    [FIELDS.currency]: 5,
    [FIELDS.status]: 6
  };

  // add first row as label
  const dataExcel = [Object.keys(columns).map((field) => LABELS[field])];

  withdraw.forEach((item) => {
    let row = new Array(7);
    Object.keys(item).forEach((field) => {
      if (columns[field] == null) return;

      if ([FIELDS.requestedDate, FIELDS.processedDate].includes(field)) {
        row[columns[field]] = item[field] ? formatDateTime(item[field]) : "";
        return;
      }
      if (field === FIELDS.amount) {
        row[columns[field]] = toNumber(item[field]);
        return;
      }
      row[columns[field]] = item[field];
    });
    dataExcel.push(row);
  });
  return dataExcel;
};

const parseWithdrawHistoryToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((item) => {
      const { requestedDate, amount, processedDate } = item;
      return {
        ...item,
        requestedDate: requestedDate ? formatDateTime(requestedDate) : "",
        processedDate: processedDate ? formatDateTime(processedDate) : "",
        amount: toCurrency(amount),
        currency: "USD"
      };
    });
  }

  return newData;
};

export const withdrawHistoryMapper = {
  parseDataToExcel: parseWithdrawHistoryToExcel,
  parseDataToGridView: parseWithdrawHistoryToGridView
};

const parseWithdrawPendingToExcel = (withdraw) => {
  if (!Array.isArray(withdraw) || withdraw.length <= 0) {
    return [];
  }

  const columns = {
    [FIELDS.timestamp]: 0,
    [FIELDS.id]: 1,
    [FIELDS.accountNumber]: 2,
    [FIELDS.amount]: 3,
    [FIELDS.currency]: 4
  };

  // add first row as label
  const dataExcel = [Object.keys(columns).map((field) => LABELS[field])];

  withdraw.forEach((item) => {
    let row = new Array(5);
    Object.keys(item).forEach((field) => {
      if (columns[field] === undefined) {
        return;
      }
      if (field === FIELDS.timestamp) {
        row[columns[field]] = item[field] ? formatDateTime(item[field]) : "";
        return;
      }
      if (field === FIELDS.amount) {
        row[columns[field]] = toNumber(item[field]);
        return;
      }
      row[columns[field]] = item[field];
    });
    dataExcel.push(row);
  });
  return dataExcel;
};

const parseWithdrawPendingToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((item) => {
      const { processedDate, amount } = item;
      return {
        ...item,
        timestamp: processedDate ? formatDateTime(processedDate) : "",
        amount: toCurrency(amount),
        currency: "USD"
      };
    });
  }

  return newData;
};

export const withdrawPendingMapper = {
  parseDataToExcel: parseWithdrawPendingToExcel,
  parseDataToGridView: parseWithdrawPendingToGridView
};
