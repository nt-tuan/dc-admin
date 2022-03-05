import * as Yup from "yup";

import { API_ERRORS, MESSAGES } from "commons/consts";
import { Form, Formik } from "formik";
import { confirmPaswordValidationSchema, passwordValidationSchema } from "./password.schema";

import { APIError } from "commons/types";
import { AuthService } from "services/auth.service";
import Button from "@mui/material/Button";
import { PasswordField } from "components/commons/fields/password-field/password-field.comp";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { isObject } from "lodash";
import { useMessage } from "@/hooks/use-message";

const validationSchema = Yup.object({
  currentPassword: passwordValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: confirmPaswordValidationSchema
});
const initialValues = {
  currentPassword: "",
  password: "",
  confirmPassword: ""
};

function LoginSetting() {
  const message = useMessage();
  const handleSubmit = (values, { resetForm, setFieldError }) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        const params = {
          currentPassword: values.currentPassword,
          newPassword: values.password
        };
        const res = await AuthService.changePassword(params);
        if (res) {
          message.success(MESSAGES.CHANGE_PASSWORD_SUCCESS);
          resetForm(initialValues);
        }
      } catch (errors) {
        if (errors instanceof APIError) {
          if (isObject(errors.errors)) {
            errors.errors.forEach((error) => {
              const errorField = error[0];
              const errorCode = error[1];
              setFieldError(errorField, API_ERRORS[errorCode]);
            });
          }
          return;
        }
        throw errors;
      }
    });
  };

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login Settings
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Stack spacing={1}>
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
          </Stack>
          <Stack mt={2} direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Stack>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginSetting;
