import * as yup from "yup";

import { Form, Formik } from "formik";
import { LoginFormContext, LoginFormProvider } from "./login-form-provider.comp";

import Box from "@mui/material/Box";
import { CheckboxField } from "components/commons/fields/checkbox-field/checkbox-field.comp";
import FormGroup from "@mui/material/FormGroup";
import { Link } from "react-router-dom";
import { LoginFormFooter } from "./login-form-footer.comp";
import MuiLink from "@mui/material/Link";
import { PasswordField } from "components/commons/fields/password-field/password-field.comp";
import { REQUIRED_ERR } from "commons/consts";
import React from "react";
import { RouteConst } from "commons/consts";
import Stack from "@mui/material/Stack";
import { TextField } from "components/commons/fields";
import Typography from "@mui/material/Typography";
import { getCompanyName } from "utils/config.util";
import { withPlugin } from "plugins/with-plugin";

const TermAndPolicy = () => {
  return (
    <Box mt={2} mb={3} className="mt-2 mb-3">
      <div>
        By Signing up, you agree to {getCompanyName()}’s{" "}
        <MuiLink
          href={process.env.REACT_APP_CCC_ENDPOINT + "/policies/terms-and-conditions"}
          color="inherit"
        >
          <strong>Terms & Conditions</strong>
        </MuiLink>{" "}
        and the{" "}
        <MuiLink
          href={process.env.REACT_APP_CCC_ENDPOINT + "/policies/privacy-policy"}
          color="inherit"
        >
          <strong>Privacy Policy</strong>
        </MuiLink>
      </div>
    </Box>
  );
};

const FormHeader = () => {
  return (
    <>
      <Typography sx={{ fontSize: "21px", lineHeight: "25px", fontWeight: "bold" }}>
        SIGN IN
      </Typography>
      <Box mt={1} mb={2} fontSize="18px">
        Please login to your account.
      </Box>
    </>
  );
};
const FormContent = () => {
  const { isLoading } = React.useContext(LoginFormContext);
  return (
    <Box mb={4}>
      <Stack spacing={2}>
        <TextField
          id="username-field"
          disabled={isLoading}
          name="username"
          fullWidth
          label="Username"
          placeholder="Username"
        />
        <PasswordField
          id="password-field"
          label="Password"
          name="password"
          placeholder="Password"
          disabled={isLoading}
          fullWidth
        />
        <Stack direction="row" justifyContent="space-between">
          <FormGroup>
            <CheckboxField name="rememberMe" label="Remember Me" />
          </FormGroup>
          <Link to={RouteConst.FORGOT_PASSWORD_ROUTE}>Forgot Username/Password</Link>
        </Stack>
      </Stack>
      <TermAndPolicy />
    </Box>
  );
};
const ELoginFormFooter = withPlugin(LoginFormFooter);

const validationSchema = yup.object({
  username: yup.string().required(REQUIRED_ERR("Username")),
  password: yup.string().required(REQUIRED_ERR("Password"))
});
export const LoginForm = ({ isLoading, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <LoginFormProvider isLoading={isLoading}>
          <Box>
            <Box p={3} maxWidth={700} maxHeight={500}>
              <FormHeader />
              <FormContent />
              <ELoginFormFooter />
            </Box>
          </Box>
        </LoginFormProvider>
      </Form>
    </Formik>
  );
};
