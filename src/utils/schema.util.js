import { PW_2_PASSWORD_NOT_THE_SAME_ERR } from "commons/consts";

const { PASSWORD_SCHEMA } = require("commons/schemas");

export const passwordSchema = (form) => {
  return {
    password: {
      name: "password",
      label: "New Password",
      placeholder: "New Password",
      className: "pb-1 mb-2",
      options: {
        rules: [
          { required: true, message: PASSWORD_SCHEMA.required.errMsg },
          {
            min: PASSWORD_SCHEMA.minMax.min,
            max: PASSWORD_SCHEMA.minMax.max,
            message: PASSWORD_SCHEMA.minMax.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Lower.regex,
            message: PASSWORD_SCHEMA.atLeast1Lower.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Number.regex,
            message: PASSWORD_SCHEMA.atLeast1Number.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Special.regex,
            message: PASSWORD_SCHEMA.atLeast1Special.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Upper.regex,
            message: PASSWORD_SCHEMA.atLeast1Upper.errMsg
          },
          {
            validator: PASSWORD_SCHEMA.CurrentPWandNewPW(form, "currentPassword", "password")
              .newPassword
          }
        ]
      }
    },
    confirmPassword: {
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "New Confirm Password",
      className: "pb-1 mb-2",
      options: {
        rules: [
          { required: true, message: PASSWORD_SCHEMA.required.errMsg },
          { validator: PASSWORD_SCHEMA.showErrorLabel },
          {
            min: PASSWORD_SCHEMA.minMax.min,
            max: PASSWORD_SCHEMA.minMax.max,
            message: PASSWORD_SCHEMA.minMax.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Lower.regex,
            message: PASSWORD_SCHEMA.atLeast1Lower.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Number.regex,
            message: PASSWORD_SCHEMA.atLeast1Number.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Special.regex,
            message: PASSWORD_SCHEMA.atLeast1Special.errMsg
          },
          {
            pattern: PASSWORD_SCHEMA.atLeast1Upper.regex,
            message: PASSWORD_SCHEMA.atLeast1Upper.errMsg
          },
          {
            validator: PASSWORD_SCHEMA.PWandConfirmPW(
              form,
              "password",
              "confirmPassword"
            ).confirmPassword(PW_2_PASSWORD_NOT_THE_SAME_ERR)
          }
        ]
      }
    }
  };
};
