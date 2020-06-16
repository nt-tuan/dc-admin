import { WALLET_SCHEMA } from "commons/schemas/wallet.schema";
import { DatetimeUtils } from "utils/date-time.util";
import { toCurrency, toNumber } from "utils/general.util";

const { FIELDS, LABELS } = WALLET_SCHEMA;
const { formatDateTime } = DatetimeUtils;

const parseDataToExcel = (financial) => {
  if (!Array.isArray(financial) || financial.length <= 0) {
    return [];
  }

  const labelIndex = {
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
  const parsedFinancial = [Object.keys(labelIndex).map((prop) => LABELS[prop])];
  financial.forEach((product) => {
    let parsedProduct = new Array(5);
    Object.keys(product).forEach((prop) => {
      if (labelIndex[prop] !== undefined) {
        if (prop === FIELDS.timestamp) {
          parsedProduct[labelIndex[prop]] = product[prop] ? formatDateTime(product[prop]) : "";
        } else if (
          [
            FIELDS.blocked,
            FIELDS.credit,
            FIELDS.debit,
            FIELDS.totalBlocked,
            FIELDS.currentTotalBalance,
            FIELDS.availableBalance
          ].includes(prop)
        ) {
          parsedProduct[labelIndex[prop]] = toNumber(product[prop]);
        } else {
          parsedProduct[labelIndex[prop]] = product[prop];
        }
      }
    });
    parsedFinancial.push(parsedProduct);
  });
  return parsedFinancial;
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
