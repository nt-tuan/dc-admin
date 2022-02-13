import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { LoginFormContext } from "./login-form-provider.comp";
import React from "react";
export const LoginFormFooter = () => {
  const { isLoading } = React.useContext(LoginFormContext);

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box>
        <LoadingButton loading={isLoading} variant="contained" type="submit">
          Log In
        </LoadingButton>
      </Box>
    </Box>
  );
};
LoginFormFooter.alias = "LoginFormFooter";
