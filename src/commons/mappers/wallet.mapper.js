import { toCurrency, toNumber } from "utils/general.util";
import { DatetimeUtils } from "utils/date-time.util";
import { WALLET_SCHEMA } from "commons/schemas/wallet.schema";

const { FIELDS, LABELS } = WALLET_SCHEMA;
const { formatDateTime } = DatetimeUtils;

const parseDataToExcel = (wallet) => {
  if (!Array.isArray(wallet) || wallet.length <= 0) {
    return [];
  }

  const columns = {
    [FIELDS.timestamp]: 0,
    [FIELDS.transactionType]: 1,
    [FIELDS.orderNumber]: 2,
    [FIELDS.productDetails]: 3,
    [FIELDS.description]: 4,
    [FIELDS.currency]: 5,
    [FIELDS.blocked]: 6,
    [FIELDS.credit]: 7,
    [FIELDS.debit]: 8,
    [FIELDS.totalBlocked]: 9,
    [FIELDS.availableBalance]: 10,
    [FIELDS.currentTotalBalance]: 11
  };
  // add first row as label
  const dataExcel = [Object.keys(columns).map((field) => LABELS[field])];

  wallet.forEach((item) => {
    let row = new Array(12);
    Object.keys(item).forEach((field) => {
      if (columns[field] !== undefined) {
        if (field === FIELDS.timestamp) {
          row[columns[field]] = item[field] ? formatDateTime(item[field]) : "";
        } else if (
          [
            FIELDS.blocked,
            FIELDS.credit,
            FIELDS.debit,
            FIELDS.totalBlocked,
            FIELDS.currentTotalBalance,
            FIELDS.availableBalance
          ].includes(field)
        ) {
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

const parseDataToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((wallet) => {
      const {
        timestamp,
        blocked,
        credit,
        debit,
        totalBlocked,
        availableBalance,
        currentTotalBalance,
        orderNumber
      } = wallet;
      return {
        ...wallet,
        id: orderNumber,
        timestamp: timestamp ? formatDateTime(timestamp) : "",
        blocked: toCurrency(blocked),
        credit: toCurrency(credit),
        debit: toCurrency(debit),
        totalBlocked: toCurrency(totalBlocked),
        availableBalance: toCurrency(availableBalance),
        currentTotalBalance: toCurrency(currentTotalBalance)
      };
    });
  }

  return newData;
};

export const walletMapper = {
  parseDataToExcel,
  parseDataToGridView
};
