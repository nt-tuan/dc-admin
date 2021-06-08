import React from "react";
import { Button } from "antd";
import { LoginFormContext } from "./login-form-provider.comp";
export const LoginFormFooter = () => {
  const { isLoading, onSubmit, getSubmitValues } = React.useContext(LoginFormContext);
  const handleSubmit = async () => {
    const { values, error, onError } = await getSubmitValues();
    if (error) {
      return;
    }
    onSubmit(values, { onError });
  };
  return (
    <div className="d-flex justify-content-between">
      <div></div>
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        type="primary"
        size="large"
        className="text-center font-weight-bold font-size-18 dtc-min-width-100 btn-auth"
        htmlType="submit"
      >
        Log In
      </Button>
    </div>
  );
};
LoginFormFooter.alias = "LoginFormFooter";
