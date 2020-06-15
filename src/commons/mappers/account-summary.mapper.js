import { ACCOUNT_SUMMARY_SCHEMA } from "commons/schemas";
import { toCurrency, toNumber } from "utils/general.util";
import { DatetimeUtils } from "utils/date-time.util";

const { FIELDS, LABELS } = ACCOUNT_SUMMARY_SCHEMA;
const { formatDateTime } = DatetimeUtils;

const parseDataToExcel = (financial) => {
  if (!Array.isArray(financial) || financial.length <= 0) {
    return [];
  }

  const labelIndex = {
    [FIELDS.originCity]: 0,
    [FIELDS.originCountry]: 1,
    [FIELDS.totalPrice]: 2,
    [FIELDS.commission]: 3,
    [FIELDS.paymentDueDate]: 4
  };
  // add first row as label
  const parsedFinancial = [Object.keys(labelIndex).map((prop) => LABELS[prop])];
  financial.forEach((product) => {
    let parsedProduct = new Array(5);
    Object.keys(product).forEach((prop) => {
      if (labelIndex[prop] !== undefined) {
        if (prop === FIELDS.paymentDueDate) {
          parsedProduct[labelIndex[prop]] = product[prop] ? formatDateTime(product[prop]) : "";
        } else if ([FIELDS.totalPrice, FIELDS.commission].includes(prop)) {
          parsedProduct[labelIndex[prop]] = toNumber(product[prop]);
        } else parsedProduct[labelIndex[prop]] = product[prop];
      }
    });
    parsedFinancial.push(parsedProduct);
  });
  return parsedFinancial;
};

const parseDataToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((account) => {
      const { paymentDueDate, totalPrice, commission } = account;
      return {
        ...account,
        id: paymentDueDate,
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
