import { Form, Formik } from "formik";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FORGOT_PASSWORD_FORM_SCHEMA } from "./forgot-pw-form.schema";
import { Link } from "react-router-dom";
import React from "react";
import { RouteConst } from "commons/consts";
import Stack from "@mui/material/Stack";
import { TextField } from "components/commons/fields";
import Typography from "@mui/material/Typography";

export const ForgotPasswordForm = ({ onSubmit }) => {
  const { email } = FORGOT_PASSWORD_FORM_SCHEMA;

  return (
    <Box pr={{ xs: 3, md: 5 }} p={3}>
      <Typography mb={2} variant="h3">
        Forgot your password?
      </Typography>
      <Typography mb={4}>
        Please enter your username or registered email address. You will receive an email shortly to
        reset your password.
      </Typography>
      <Formik onSubmit={onSubmit} initialValues={{ email: "" }}>
        <Form>
          <Stack spacing={3}>
            <TextField
              required
              sx={{ maxWidth: 500 }}
              name={email.name}
              label={email.label}
              placeholder={email.placeholder}
            />
            <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
              <Button type="submit" variant="contained">
                Send
              </Button>
              <Link to={RouteConst.LOGIN_ROUTE}>
                <Typography color="primary">
                  <strong>Back to Login</strong>
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};
