export const REQUIRED_ERR = (label) => `Please enter the ${label} of the user.`;
export const USER_SCHEMA = {
  firstName: {
    name: "firstName",
    label: "First Name"
  },
  lastName: {
    name: "lastName",
    label: "Last Name"
  },
  email: {
    name: "email",
    label: "Email"
  },
  username: {
    name: "username",
    label: "User Name"
  }
};

export const ERROR_EXIST = {
  EMAIL: "user.email.exist.true",
  USER_NAME: "user.exist.true"
};
