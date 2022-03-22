import { REQUIRED_ERR } from "@/commons/consts";
export const LOGIN_SCHEMA = {
  username: {
    name: "username",
    label: "Username",
    placeholder: "Username",
    className: "pb-1 mb-2",
    options: {
      rules: [{ required: true, message: REQUIRED_ERR("Username") }]
    }
  },
  password: {
    name: "password",
    label: "Password",
    placeholder: "Password",
    className: "pb-1 mb-2",
    options: {
      rules: [{ required: true, message: REQUIRED_ERR("Password") }]
    }
  },
  rememberMe: {
    name: "rememberMe",
    label: "Remember Me",
    initialValue: false,
    className: "col-12",
    options: {}
  }
};
