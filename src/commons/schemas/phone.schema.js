import React from "react";
import { Select } from "antd";
import {
  RegexConst,
  REQUIRED_ERR,
  PHONE_ONLY_NUMBER_ERR,
  PHONE_CODE_REQUIRED_ERR
} from "commons/consts";
import { createFormErrorComp, bindingTo, checkExist } from "utils";

export const PHONE_SCHEMA = {
  prefixInitialValue: (phoneString) => {
    const prefixAndNumberArr = phoneString.split(" ");
    return prefixAndNumberArr.length ? prefixAndNumberArr[0].replace("+", "") : null;
  },
  numberInitialValue: (phoneString) => {
    const prefixAndNumberArr = phoneString.split(" ");
    return prefixAndNumberArr.length ? prefixAndNumberArr[1] : null;
  },
  required: {
    errMsg: createFormErrorComp(REQUIRED_ERR("Phone Number"))
  },
  numberOnly: {
    regex: RegexConst.ONLY_NUMBER_REGEX,
    errMsg: createFormErrorComp(PHONE_ONLY_NUMBER_ERR)
  },
  bindingToPhonePrefix: (form, name = "phonePrefix") =>
    checkExist(form, name, PHONE_CODE_REQUIRED_ERR),
  createPhonePrefix: (form, config) => {
    const { className, name, phoneName, phonePrefixList, initialValue, size, disabled } = config;
    const disablePhonePrefix = phonePrefixList.length === 0 || disabled;
    return form.getFieldDecorator(name, {
      initialValue: initialValue,
      rules: [{ validator: bindingTo(form, phoneName, true) }]
    })(
      <Select
        size={size}
        disabled={disablePhonePrefix}
        allowClear
        className={className}
        notFoundContent={<div />}
        firstActiveValue={phonePrefixList.length ? phonePrefixList[0] : undefined}
      >
        {phonePrefixList.map((prefix) => (
          <Select.Option style={{ fontSize: "0.9rem" }} key={prefix} value={prefix}>
            {`+${prefix}`}
          </Select.Option>
        ))}
      </Select>
    );
  }
};
