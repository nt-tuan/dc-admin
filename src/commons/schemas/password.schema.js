import {
  RegexConst,
  REQUIRED_ERR,
  PW_MIN_MAX_CHARS_ERR,
  PW_ATLEAST_1_NUM_ERR,
  PW_ATLEAST_1_UPPER_ERR,
  PW_ATLEAST_1_SPECIAL_ERR,
  PW_ATLEAST_1_LOWER_ERR,
  CUR_PW_SAME_AS_NEW_PW_ERR
} from "commons/consts";
import { createFormErrorComp, bindingTo, compareTo } from "utils";
import { log } from "utils/logger.util";

export const PASSWORD_SCHEMA = {
  required: {
    errMsg: createFormErrorComp(REQUIRED_ERR("Password"))
  },
  minMax: {
    min: 8,
    max: 32,
    errMsg: createFormErrorComp(PW_MIN_MAX_CHARS_ERR)
  },
  atLeast1Number: {
    regex: RegexConst.ATLEAST_1_NUM_REGEX,
    errMsg: createFormErrorComp(PW_ATLEAST_1_NUM_ERR)
  },
  atLeast1Upper: {
    regex: RegexConst.ATLEAST_1_UPPER_REGEX,
    errMsg: createFormErrorComp(PW_ATLEAST_1_UPPER_ERR)
  },
  atLeast1Lower: {
    regex: RegexConst.ATLEAST_1_LOWER_REGEX,
    errMsg: createFormErrorComp(PW_ATLEAST_1_LOWER_ERR)
  },
  atLeast1Special: {
    regex: RegexConst.ATLEAST_1_SPECIAL_REGEX,
    errMsg: createFormErrorComp(PW_ATLEAST_1_SPECIAL_ERR)
  },
  PWandConfirmPW: (form, pwName, confirmPwName) => ({
    password: bindingTo(form, confirmPwName),
    confirmPassword: (errMsg) =>
      compareTo(form, { targetFieldName: pwName, errMsg, errorOnEqual: false })
  }),
  CurrentPWandNewPW: (form, curPwName, newPwName) => ({
    currentPassword: bindingTo(form, newPwName),
    newPassword: compareTo(form, {
      targetFieldName: curPwName,
      errMsg: CUR_PW_SAME_AS_NEW_PW_ERR,
      errorOnEqual: true
    })
  }),
  showErrorLabel: (rule, value, callback) => {
    try {
      if (value && !RegExp(RegexConst.ALL_ATLEAST_COMBINE).test(value)) {
        callback(createFormErrorComp("Your Password must:"));
      }
      callback();
    } catch (error) {
      log(error);
    }
  }
};
