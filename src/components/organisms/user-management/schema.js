import { EMAIL_NOT_VALID_ERR } from "commons/consts";
export const REQUIRED_ERR = (label) => `Please enter the ${label} of the user`;
export const USER_SCHEMA = {
  firstName: {
    name: "firstName",
    label: "First Name",
    rules: [{ required: true, message: REQUIRED_ERR("first name") }]
  },
  lastName: {
    name: "lastName",
    label: "Last Name",
    rules: [{ required: true, message: REQUIRED_ERR("last name") }]
  },
  email: {
    name: "email",
    label: "Email",
    rules: [
      { required: true, message: REQUIRED_ERR("email") },
      { type: "email", message: EMAIL_NOT_VALID_ERR }
    ]
  },
  username: {
    name: "username",
    label: "Username",
    rules: [{ required: true, message: REQUIRED_ERR("username") }]
  }
};
