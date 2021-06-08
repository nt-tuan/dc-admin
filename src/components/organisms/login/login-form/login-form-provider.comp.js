import { API_ERRORS } from "commons/consts";
import React from "react";

export const LoginFormContext = React.createContext({
  getSubmitValues: () => ({})
});
export const LoginFormProvider = ({ form, onSubmit, onSendEmailUnblock, isLoading, children }) => {
  const [serverError, setServerError] = React.useState();
  const getSubmitValues = async () => {
    const onServerError = (errors) => {
      const errorCode = errors[0][1];
      const serverError = API_ERRORS[errorCode];
      setServerError(serverError);
    };

    const result = { onError: onServerError };
    try {
      const values = await form.validateFields();
      const _values = { ...values };
      delete _values.agreement;
      result.values = _values;
    } catch (errorInfo) {
      result.error = errorInfo?.errorFields[0]?.errors;
    }
    return result;
  };
  return (
    <LoginFormContext.Provider
      value={{
        form,
        onSubmit,
        getSubmitValues,
        onSendEmailUnblock,
        isLoading,
        serverError,
        setServerError
      }}
    >
      {children}
    </LoginFormContext.Provider>
  );
};
