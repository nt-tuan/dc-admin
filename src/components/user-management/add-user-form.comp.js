import * as yup from "yup";

import { Grid } from "@mui/material";
import { ERROR_EXIST, REQUIRED_ERR, USER_SCHEMA } from "./schema";

import { LoadingButton } from "@mui/lab";
import React from "react";
import Stack from "@mui/material/Stack";
import { UserService } from "@/services";
import { useFormik } from "formik";
import { EMAIL_NOT_VALID_ERR, getErrorExistMessage } from "@/commons/consts";
import FieldItem from "./field-item";
import { useMessage } from "@/hooks/use-message";

const validationSchema = yup.object({
  firstName: yup.string().required(REQUIRED_ERR("first name")),
  lastName: yup.string().required(REQUIRED_ERR("last name")),
  username: yup.string().required(REQUIRED_ERR("user name")),
  email: yup.string().required(REQUIRED_ERR("email")).email(EMAIL_NOT_VALID_ERR)
});

export const AddUserForm = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = React.useState();
  const message = useMessage();

  const handleShowErrorMessage = (errors, values) => {
    const { email, username } = values;
    const haveErrors = errors?.length > 0;

    if (!haveErrors) return;

    const showErrorMessage = (value, ...rest) => message.error(value, { ...rest });
    const isErrorField = (errorExist) =>
      errors?.some((errorItem) => errorItem.includes(errorExist));

    if (
      (isErrorField(ERROR_EXIST.EMAIL) && isErrorField(ERROR_EXIST.USER_NAME)) ||
      isErrorField(ERROR_EXIST.EMAIL)
    ) {
      return showErrorMessage(getErrorExistMessage(email));
    }

    if (isErrorField(ERROR_EXIST.USER_NAME)) {
      return showErrorMessage(getErrorExistMessage(username));
    }

    return showErrorMessage("Something went wrong, please press F5 to refresh the page", {
      persist: true
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await UserService.addAdminUser(values);
      onSuccess && onSuccess(values);
    } catch (error) {
      const { errors } = error;
      handleShowErrorMessage(errors, values);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <>
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
            disabled={loading}
          />
          <FieldItem
            name={USER_SCHEMA.username.name}
            label={USER_SCHEMA.username.label}
            formik={formik}
            disabled={loading}
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
    </>
  );
};
