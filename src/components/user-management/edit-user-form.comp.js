import * as yup from "yup";

import { Grid } from "@mui/material";
import { REQUIRED_ERR, USER_SCHEMA } from "./schema";

import { LoadingButton } from "@mui/lab";
import React from "react";
import Stack from "@mui/material/Stack";
import { UserService } from "@/services";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import { useFormik } from "formik";
import FieldItem from "./field-item";

const validationSchema = yup.object({
  firstName: yup.string().required(REQUIRED_ERR("first name")),
  lastName: yup.string().required(REQUIRED_ERR("last name"))
});

export const EditUserForm = ({ onSuccess, onCancel, user }) => {
  const [loading, setLoading] = React.useState();
  const asyncErrorHandler = useAsyncErrorHandler();

  const handleSubmit = (values) => {
    const payload = { firstName: values.firstName, lastName: values.lastName };
    asyncErrorHandler(async () => {
      setLoading(true);
      await UserService.editAdminUser(user.id, payload);
      onSuccess && onSuccess(values);
    }).finally(() => setLoading());
  };

  const formik = useFormik({
    initialValues: {
      firstName: user ? user["firstName"] : "",
      lastName: user ? user["lastName"] : "",
      email: user ? user["email"] : "",
      username: user ? user["username"] : ""
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container flexDirection="column">
        <FieldItem
          name={USER_SCHEMA.firstName.name}
          label={USER_SCHEMA.firstName.label}
          formik={formik}
          disabled={loading}
        />
        <FieldItem
          name={USER_SCHEMA.lastName.name}
          label={USER_SCHEMA.lastName.label}
          formik={formik}
          disabled={loading}
        />
        <FieldItem
          name={USER_SCHEMA.email.name}
          label={USER_SCHEMA.email.label}
          formik={formik}
          disabled
        />
        <FieldItem
          name={USER_SCHEMA.username.name}
          label={USER_SCHEMA.username.label}
          formik={formik}
          disabled
        />
      </Grid>

      <Stack spacing={2} direction="row" marginTop={5}>
        <LoadingButton
          loading={loading}
          variant="outlined"
          size="large"
          onClick={() => onCancel && onCancel()}
        >
          Cancel
        </LoadingButton>
        <LoadingButton loading={loading} variant="contained" size="large" type="submit">
          Save
        </LoadingButton>
      </Stack>
    </form>
  );
};
