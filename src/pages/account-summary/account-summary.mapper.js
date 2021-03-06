import { toCurrency, toNumber } from "@/utils/general.util";

import { ACCOUNT_SUMMARY_SCHEMA } from "./account-summary.schema";
import { DatetimeUtils } from "@/utils/date-time.util";

const { FIELDS, LABELS } = ACCOUNT_SUMMARY_SCHEMA;
const { formatDateTime } = DatetimeUtils;

const parseDataToExcel = (accountSummary) => {
  if (!Array.isArray(accountSummary) || accountSummary.length <= 0) {
    return [];
  }

  const columns = {
    [FIELDS.createdDate]: 0,
    [FIELDS.number]: 1,
    [FIELDS.destinationCity]: 2,
    [FIELDS.destinationCountry]: 3,
    [FIELDS.originCity]: 4,
    [FIELDS.originCountry]: 5,
    [FIELDS.totalPrice]: 6,
    [FIELDS.commission]: 7,
    [FIELDS.paymentDueDate]: 8
  };

  // add first row as label
  const dataExcel = [Object.keys(columns).map((field) => LABELS[field])];

  accountSummary.forEach((item) => {
    let row = new Array(9);
    Object.keys(item).forEach((field) => {
      if (columns[field] == null) return;
      if ([FIELDS.paymentDueDate, FIELDS.createdDate].includes(field)) {
        row[columns[field]] = item[field] ? formatDateTime(item[field]) : "";
      } else if ([FIELDS.totalPrice, FIELDS.commission].includes(field)) {
        row[columns[field]] = toNumber(item[field]);
      } else {
        row[columns[field]] = item[field];
      }
    });
    dataExcel.push(row);
  });
  return dataExcel;
};

const parseDataToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((account) => {
      const { paymentDueDate, totalPrice, commission, createdDate } = account;
      return {
        ...account,
        id: createdDate,
        createdDate: createdDate ? formatDateTime(createdDate) : "",
        paymentDueDate: paymentDueDate ? formatDateTime(paymentDueDate) : "",
        totalPrice: toCurrency(totalPrice),
        commission: toCurrency(commission)
      };
    });
  }

  return newData;
};

export const financialMapper = {
  parseDataToExcel,
  parseDataToGridView
};
