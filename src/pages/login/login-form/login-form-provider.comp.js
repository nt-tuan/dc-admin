import React from "react";

export const LoginFormContext = React.createContext({
  getSubmitValues: () => ({})
});
export const LoginFormProvider = ({ isLoading, children }) => {
  return (
    <LoginFormContext.Provider
      value={{
        isLoading
      }}
    >
      {children}
    </LoginFormContext.Provider>
  );
};
