import * as Yup from "yup";

import {
  PW_2_PASSWORD_NOT_THE_SAME_ERR,
  PW_ATLEAST_1_LOWER_ERR,
  PW_ATLEAST_1_NUM_ERR,
  PW_ATLEAST_1_SPECIAL_ERR,
  PW_ATLEAST_1_UPPER_ERR,
  PW_MIN_MAX_CHARS_ERR,
  REQUIRED_ERR,
  RegexConst
} from "@/commons/consts";

export const passwordValidationSchema = Yup.string()
  .required(REQUIRED_ERR("Password"))
  .min(8, PW_MIN_MAX_CHARS_ERR)
  .max(32, PW_MIN_MAX_CHARS_ERR)
  .matches(RegexConst.ATLEAST_1_LOWER_REGEX, PW_ATLEAST_1_LOWER_ERR)
  .matches(RegexConst.ATLEAST_1_NUM_REGEX, PW_ATLEAST_1_NUM_ERR)
  .matches(RegexConst.ATLEAST_1_SPECIAL_REGEX, PW_ATLEAST_1_SPECIAL_ERR)
  .matches(RegexConst.ATLEAST_1_UPPER_REGEX, PW_ATLEAST_1_UPPER_ERR);
export const confirmPaswordValidationSchema = Yup.string()
  .required(REQUIRED_ERR("Confirm Password"))
  .test("confirm-password", PW_2_PASSWORD_NOT_THE_SAME_ERR, async (value, { parent }) => {
    return value === parent.password;
  });
