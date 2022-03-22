import React from "react";
import { API_ERRORS } from "@/commons/consts";

export const createFormErrorComp = (msg) => {
  return <span className="font-size-12 d-block">{msg}</span>;
};

export const parseErrorsFromServer = (errors, values) => {
  if (errors.length) {
    let parsedErrors = {};
    errors.forEach(
      (err) =>
        (parsedErrors[err[0]] = {
          value: values[err[0]],
          errors: [createFormErrorComp(API_ERRORS[err[1]])]
        })
    );
    return parsedErrors;
  }
  return undefined;
};

export const bindingTo = (form, targetFieldName, bypassTouch = false) => (
  rule,
  value,
  callback
) => {
  const isTargetTouched = bypassTouch ? true : form.isFieldTouched(targetFieldName);
  if (value && isTargetTouched) {
    form.validateFields([targetFieldName], { force: true });
  }
  callback();
};

export const compareTo = (form, config) => (rule, value, callback) => {
  const { targetFieldName, errMsg, errorOnEqual } = config;
  const targetValue = form.getFieldValue(targetFieldName);

  if (value && value === targetValue && errorOnEqual) {
    callback(createFormErrorComp(errMsg));
  }
  if (value && value !== targetValue && !errorOnEqual) {
    callback(createFormErrorComp(errMsg));
  }
  callback();
};

export const checkExist = (form, targetFieldName, errMsg) => (rule, value, callback) => {
  const targetValue = form.getFieldValue(targetFieldName);

  if (targetValue === "undefined" || typeof targetValue === "undefined") {
    callback(createFormErrorComp(errMsg));
  }
  callback();
};

// shallow comparison
export const equalFields = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
