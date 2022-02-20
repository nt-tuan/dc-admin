import { MAX_CHARS } from "commons/consts";
import numeral from "numeral";

export const typeTAX = {
  MAIN: "MAIN",
  OTHERS: "OTHERS"
};
export const FIELDS = {
  type: "type",
  name: "name",
  percent: "percent",
  taxPayer: "taxPayer",
  lumpSum: "lumpSum",
  applyType: "applyType",
  applyTypeOther: "applyTypeOther",
  isLumSum: "isLumSum"
};

const LABELS = {
  [FIELDS.type]: "Type of tax",
  [FIELDS.name]: "Specify tax name",
  [FIELDS.percent]: "Tax% applied to product ",
  [FIELDS.taxPayer]: "To whom should these charges/ tax be applied ?",
  [FIELDS.lumpSum]: "Lump-sum tax applied to the total net invoice (USD)",
  [FIELDS.applyType]: "Does this Trade Route and Product Category incur any Tax?"
};

export const taxRulesValue = [
  { label: "VAT", value: "VAT" },
  { label: "Sales Tax", value: "SALES" },
  { label: "Other", value: "OTHER" }
];

export const taxTypeOtherValue = [
  { label: "Custom and Duties", value: "CUSTOM_AND_DUTIES" },
  { label: "Other", value: "OTHER" }
];

export const taxPayerValue = [
  { label: "Buyer", value: "BUYER" },
  { label: "Logistic Provider", value: "LOGISTIC_PROVIDER" }
];

export let hiddenFields = [FIELDS.taxName];

export const RULES_PERCENT_FORMAT = {
  validator: (rule, value, callback) => {
    const inputAmount = numeral(value).value();
    if (inputAmount != null && inputAmount <= 0) {
      return callback("The tax percentage must be greater than 0");
    }
    if (inputAmount != null && inputAmount > 0 && inputAmount < 100) {
      return callback();
    }
    return callback("The tax percentage max 2 numbers");
  }
};

export const RULES_LUMSUM_FORMAT = {
  validator: (rule, value, callback) => {
    const inputAmount = numeral(value).value();
    if (isNaN(inputAmount)) {
      return callback("The lump-sum amount is the number");
    }
    if (inputAmount < 0) {
      return callback("The lump-sum amount must be greater than 0");
    }
    callback();
  }
};

export const TAX_RULES_TYPE_MAIN_SCHEMA = [
  {
    label: LABELS[FIELDS.applyType],
    name: FIELDS.applyType,
    type: "radio",
    initValue: 0,
    data: [
      {
        value: typeTAX.MAIN,
        name: "Yes"
      },
      {
        value: 0,
        name: "No"
      }
    ]
  }
];

export const TAX_RULES_MAIN_SCHEMA = [
  {
    label: LABELS[FIELDS.type],
    name: FIELDS.type,
    type: "select",
    placeholder: "Type of Tax",
    data: [...taxRulesValue],
    initValue: null,
    rules: [{ required: true, message: "Please choose the type of tax" }]
  },
  {
    label: LABELS[FIELDS.name],
    name: FIELDS.name,
    type: "input",
    placeholder: "Enter Tax Name",
    initValue: null,
    rules: [
      {
        max: 20,
        message: MAX_CHARS(LABELS[FIELDS.name], 20)
      }
    ]
  },
  {
    label: LABELS[FIELDS.percent],
    name: FIELDS.percent,
    type: "input",
    initValue: null,
    placeholder: "Tax Percentage",
    rules: [
      {
        required: true,
        message: "Please enter the tax name"
      },
      RULES_PERCENT_FORMAT
    ]
  }
];

export const ID_FIELDS = [
  {
    name: "id",
    type: "input",
    initValue: null,
    hidden: true,
    rules: []
  }
];
