export const parseFormValues = (values) => {
  return {
    currentPassword: values.currentPassword,
    newPassword: values.password
  };
};
