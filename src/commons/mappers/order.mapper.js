import { ORDERS_SCHEMA } from "commons/schemas";
import { toNumber, toCurrency } from "utils/general.util";
import { DatetimeUtils } from "utils/date-time.util";

const { FIELDS, LABELS, ORDER_STATUS_LABELS, ORDER_STATUS } = ORDERS_SCHEMA;
const { formatDateTime } = DatetimeUtils;

const parseActiveOrderToExcel = (order) => {
  if (!Array.isArray(order) || order.length <= 0) {
    return [];
  }

  const columns = {
    [FIELDS.timestamp]: 0,
    [FIELDS.orderNumber]: 1,
    [FIELDS.productCategory]: 2,
    [FIELDS.productType]: 3,
    [FIELDS.productBrand]: 4,
    [FIELDS.productName]: 5,
    [FIELDS.quantity]: 6,
    [FIELDS.unitPrice]: 7,
    [FIELDS.totalPrice]: 8,
    [FIELDS.buyerCompanyName]: 9,
    [FIELDS.sellerCompanyName]: 10,
    [FIELDS.status]: 11
  };

  // add first row as label
  const dataExcel = [Object.keys(columns).map((field) => LABELS[field])];

  order.forEach((item) => {
    let row = new Array(12);
    Object.keys(item).forEach((field) => {
      if (columns[field] !== undefined) {
        if (FIELDS.timestamp === field) {
          row[columns[field]] = item[field] ? formatDateTime(item[field]) : "";
        } else if (FIELDS.status === field) {
          row[columns[field]] = ORDER_STATUS_LABELS[item[field]]
            ? ORDER_STATUS_LABELS[item[field]]
            : item[field];
        } else if ([FIELDS.unitPrice, FIELDS.totalPrice].includes(field)) {
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

const parseActiveOrderToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((account) => {
      const { createdDate, unitPrice, total, number, process } = account;
      return {
        ...account,
        id: number,
        createdDate: createdDate ? formatDateTime(createdDate) : "",
        process: ORDER_STATUS_LABELS[process],
        unitPrice: toCurrency(unitPrice),
        total: toCurrency(total)
      };
    });
  }

  return newData;
};

export const activeOrderMapper = {
  parseDataToExcel: parseActiveOrderToExcel,
  parseDataToGridView: parseActiveOrderToGridView
};

const parseHistoryOrderToExcel = (order) => {
  if (!Array.isArray(order) || order.length <= 0) {
    return [];
  }

  const columns = {
    [FIELDS.timestamp]: 0,
    [FIELDS.orderNumber]: 1,
    [FIELDS.productName]: 2,
    [FIELDS.quantity]: 3,
    [FIELDS.unitPrice]: 4,
    [FIELDS.totalPrice]: 5,
    [FIELDS.buyerCompanyName]: 6,
    [FIELDS.sellerCompanyName]: 7,
    [FIELDS.status]: 8
  };

  // add first row as label
  const dataExcel = [Object.keys(columns).map((field) => LABELS[field])];

  order.forEach((item) => {
    let row = new Array(9);
    Object.keys(item).forEach((field) => {
      if (columns[field] !== undefined) {
        if (FIELDS.timestamp === field) {
          row[columns[field]] = item[field] ? formatDateTime(item[field]) : "";
        } else if (FIELDS.status === field) {
          row[columns[field]] = ORDER_STATUS_LABELS[item[field]]
            ? ORDER_STATUS_LABELS[item[field]]
            : item[field];
        } else if ([FIELDS.unitPrice, FIELDS.totalPrice].includes(field)) {
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

const parseHistoryOrderToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((account) => {
      const { createdDate, unitPrice, total, number, process, isExternalPayment } = account;
      return {
        ...account,
        id: number,
        createdDate: createdDate ? formatDateTime(createdDate) : "",
        process:
          isExternalPayment && process === ORDER_STATUS.DONE
            ? ORDER_STATUS_LABELS.EXTERNAL_ORDER_PAYMENT
            : ORDER_STATUS_LABELS[process],
        unitPrice: toCurrency(unitPrice),
        total: toCurrency(total)
      };
    });
  }

  return newData;
};

export const historyOrderMapper = {
  parseDataToExcel: parseHistoryOrderToExcel,
  parseDataToGridView: parseHistoryOrderToGridView
};
