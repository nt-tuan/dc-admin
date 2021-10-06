import { REQUIRED_ERR } from "commons/consts";

export const FORGOT_PASSWORD_FORM_SCHEMA = {
  email: {
    name: "email",
    label: "E-mail or Username",
    placeholder: "E-mail or Username",
    className: "pb-1 mb-2",
    options: {
      rules: [{ required: true, message: REQUIRED_ERR("E-mail or Username") }]
    }
  }
};
