import { REQUIRED_ERR } from "commons/consts";

const LABEL = "E-mail or Username";
export const FORGOT_PASSWORD_FORM_SCHEMA = {
  email: {
    name: "email",
    label: LABEL,
    placeholder: LABEL,
    className: "pb-1 mb-2",
    options: {
      rules: [{ required: true, message: REQUIRED_ERR(LABEL) }]
    }
  }
};
