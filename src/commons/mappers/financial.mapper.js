import { FINANCIAL_SCHEMA } from "../schemas";
import { DATETIME_FORMAT } from "commons/consts";
import dayjs from "dayjs";

const { FIELDS, LABELS } = FINANCIAL_SCHEMA;

const parseDataToExcel = (financial) => {
  if (!Array.isArray(financial) || financial.length <= 0) {
    return [];
  }

  const labelIndex = {
    [FIELDS.date]: 0,
    [FIELDS.number]: 1,
    [FIELDS.city]: 2,
    [FIELDS.country]: 3,
    [FIELDS.value]: 4,
    [FIELDS.payment]: 5,
    [FIELDS.commission]: 6
  };
  // add first row as label
  const parsedFinancial = [Object.keys(labelIndex).map((prop) => LABELS[prop])];
  financial.forEach((product) => {
    let parsedProduct = new Array(6);
    Object.keys(product).forEach((prop) => {
      if (labelIndex[prop] !== undefined) {
        if (prop === FIELDS.date) {
          parsedProduct[labelIndex[prop]] = dayjs(product[prop]).format(DATETIME_FORMAT);
        } else parsedProduct[labelIndex[prop]] = product[prop];
      }
    });
    parsedFinancial.push(parsedProduct);
  });
  return parsedFinancial;
};

export const financialMapper = {
  parseDataToExcel
};
