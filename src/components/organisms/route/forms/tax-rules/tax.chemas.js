import React from "react";
import { createFormErrorComp } from "utils/form.util";
import { REQUIRED_ERR, MAX_CHARS } from "commons/consts";
// import { FormError } from "components/atoms";
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
  [FIELDS.applyType]: "Does this Trade Route and Product Category incur any Tax?",
  [FIELDS.applyTypeOther]:
    "Is there any other tax that is applicable to the total net invoice amount?"
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

export const TAX_RULES_TYPE_OTHER_SCHEMA = [
  {
    label: LABELS[FIELDS.applyTypeOther],
    name: FIELDS.applyTypeOther,
    type: "radio",
    initValue: 0,
    data: [
      {
        value: typeTAX.OTHERS,
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
    placeholder: LABELS[FIELDS.type],
    initValue: [...taxRulesValue],
    rules: [{ required: true, message: createFormErrorComp("Please choose the type of tax") }]
  },
  {
    label: LABELS[FIELDS.name],
    name: FIELDS.name,
    type: "input",
    placeholder: "Enter Tax Name",
    initValue: null,
    rules: [
      {
        required: true,
        message: createFormErrorComp("Please enter the tax name")
      },
      {
        max: 20,
        message: createFormErrorComp(MAX_CHARS(LABELS[FIELDS.name], 20))
      }
    ]
  },
  {
    label: LABELS[FIELDS.percent],
    name: FIELDS.percent,
    type: "input",
    initValue: null,
    placeholder: "00.00",
    rules: [
      {
        required: true,
        message: createFormErrorComp(REQUIRED_ERR("the tax percentage"))
      },
      {
        validator: (rule, value, callback) => {
          const inputAmount = numeral(value).value();
          if (inputAmount >= 0 && inputAmount < 100) {
            return callback();
          }
          return callback(createFormErrorComp("The tax percentage max 2 number"));
        }
      }
    ]
  }
];

export const TAX_RULES_OTHER_SCHEMA = [
  {
    label: LABELS[FIELDS.taxPayer],
    name: FIELDS.taxPayer,
    type: "select",
    placeholder: "Select Taxpayer",
    initValue: [...taxPayerValue],
    rules: [
      {
        required: true,
        message: createFormErrorComp(REQUIRED_ERR("taxpayer"))
      }
    ]
  },
  {
    label: LABELS[FIELDS.name],
    name: FIELDS.name,
    type: "input",
    placeholder: "Enter Tax Name",
    initValue: null,
    rules: [
      {
        required: true,
        message: createFormErrorComp(REQUIRED_ERR("Please enter the tax name"))
      },
      {
        max: 20,
        message: createFormErrorComp(MAX_CHARS(LABELS[FIELDS.name], 20))
      }
    ]
  },
  {
    label: LABELS[FIELDS.type],
    name: FIELDS.type,
    type: "select",
    placeholder: LABELS[FIELDS.type],
    initValue: [...taxTypeOtherValue],
    rules: [{ required: true, message: createFormErrorComp("Please choose the type of tax") }]
  },
  {
    label: LABELS[FIELDS.isLumSum],
    name: FIELDS.isLumSum,
    type: "radio",
    initValue: 1,
    classNames: "col-6",
    data: [
      {
        value: 1,
        name: "Tax% applied to total net invoice"
      },
      {
        value: 0,
        name: "Lump-sum tax applied to the total net invoice (USD)"
      }
    ]
  },
  {
    label: null,
    name: FIELDS.percent,
    type: "input",
    initValue: null,
    placeholder: "00.00%",
    disabled: false,
    or: "OR",
    rules: [
      {
        required: true,
        message: createFormErrorComp(REQUIRED_ERR("the tax percentage"))
      },
      {
        validator: (rule, value, callback) => {
          const inputAmount = numeral(value).value();
          if (inputAmount >= 0 && inputAmount < 100) {
            return callback();
          }
          return callback(createFormErrorComp("The tax percentage max 2 number"));
        }
      }
    ]
  },
  {
    label: null,
    name: FIELDS.lumpSum,
    type: "input",
    placeholder: "Lump-sum amount",
    initValue: null,
    disabled: true,
    or: "",
    rules: [
      // {
      //   required: true,
      //   message: createFormErrorComp(REQUIRED_ERR("Please enter the Lump-sum amount"))
      // }
    ]
  }
];
