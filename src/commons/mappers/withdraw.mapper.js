import { WITHDRAWAL_SCHEMA } from "commons/schemas";
import { toCurrency, toNumber } from "utils/general.util";
import { DatetimeUtils } from "utils/date-time.util";

const { FIELDS, LABELS } = WITHDRAWAL_SCHEMA;
const { formatDateTime } = DatetimeUtils;

const parseWithdrawHistoryToExcel = (withdraw) => {
  if (!Array.isArray(withdraw) || withdraw.length <= 0) {
    return [];
  }

  const columns = {
    [FIELDS.requestedDate]: 0,
    [FIELDS.processedDate]: 1,
    [FIELDS.withdrawalId]: 2,
    [FIELDS.depositedAccount]: 3,
    [FIELDS.debit]: 4,
    [FIELDS.currency]: 5,
    [FIELDS.status]: 6
  };

  // add first row as label
  const dataExcel = [Object.keys(columns).map((field) => LABELS[field])];

  withdraw.forEach((item) => {
    let row = new Array(7);
    Object.keys(item).forEach((field) => {
      if (columns[field] !== undefined) {
        if ([FIELDS.requestedDate, FIELDS.processedDate].includes(field)) {
          row[columns[field]] = item[field] ? formatDateTime(item[field]) : "";
        } else if (field === FIELDS.debit) {
          row[columns[field]] = toNumber(item[field]);
        } else {
          row[columns[field]] = item[field];
        }
      }
    });
    dataExcel.push(row);
  });
  return dataExcel;
};

const parseWithdrawHistoryToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((item) => {
      const { requestedDate, debit, processedDate } = item;
      return {
        ...item,
        id: requestedDate,
        requestedDate: requestedDate ? formatDateTime(requestedDate) : "",
        processedDate: processedDate ? formatDateTime(processedDate) : "",
        debit: toCurrency(debit)
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
    [FIELDS.timeStamp]: 0,
    [FIELDS.withdrawalId]: 1,
    [FIELDS.depositedAccount]: 2,
    [FIELDS.debit]: 3,
    [FIELDS.currency]: 4
  };

  // add first row as label
  const dataExcel = [Object.keys(columns).map((field) => LABELS[field])];

  withdraw.forEach((item) => {
    let row = new Array(5);
    Object.keys(item).forEach((field) => {
      if (columns[field] !== undefined) {
        if (field === FIELDS.timeStamp) {
          row[columns[field]] = item[field] ? formatDateTime(item[field]) : "";
        } else if (field === FIELDS.debit) {
          row[columns[field]] = toNumber(item[field]);
        } else {
          row[columns[field]] = item[field];
        }
      }
    });
    dataExcel.push(row);
  });
  return dataExcel;
};

const parseWithdrawPendingToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((item) => {
      const { timeStamp, debit } = item;
      return {
        ...item,
        timeStamp: timeStamp ? formatDateTime(timeStamp) : "",
        debit: toCurrency(debit)
      };
    });
  }

  return newData;
};

export const withdrawPendingMapper = {
  parseDataToExcel: parseWithdrawPendingToExcel,
  parseDataToGridView: parseWithdrawPendingToGridView
};
