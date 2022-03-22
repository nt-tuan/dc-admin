import Button from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { PasswordField } from "@/components/commons/fields/password-field/password-field.comp";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { confirmPaswordValidationSchema, passwordValidationSchema } from "./schema";

const validationSchema = Yup.object({
  currentPassword: passwordValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: confirmPaswordValidationSchema
});
export const ChangePasswordForm = React.forwardRef(({ onSubmit, isLoading }, ref) => {
  return (
    <Formik
      innerRef={ref}
      initialValues={{
        currentPassword: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Stack spacing={4}>
          <PasswordField
            label="Current Password"
            name="currentPassword"
            placeholder="Current Password"
            fullWidth
          />
          <PasswordField
            label="New Password"
            name="password"
            placeholder="New Password"
            fullWidth
          />
          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            fullWidth
          />
          <Box>
            <Button loading={isLoading} type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </Stack>
      </Form>
    </Formik>
  );
});
