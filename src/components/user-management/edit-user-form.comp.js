import * as yup from "yup";

import { Divider, FormControl, FormHelperText, FormLabel, OutlinedInput } from "@mui/material";
import { REQUIRED_ERR, USER_SCHEMA } from "./schema";

import { LoadingButton } from "@mui/lab";
import React from "react";
import Stack from "@mui/material/Stack";
import { UserService } from "@/services";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { useFormik } from "formik";

const EDIT_USER_SCHEMA = [USER_SCHEMA.firstName, USER_SCHEMA.lastName];

const validationSchema = yup.object({
  firstName: yup.string().required(REQUIRED_ERR("first name")),
  lastName: yup.string().required(REQUIRED_ERR("last name"))
});

export const EditUserForm = ({ onSuccess, onCancel, user }) => {
  const [loading, setLoading] = React.useState();

  const handleSubmit = (values) => {
    asyncErrorHandlerWrapper(async () => {
      setLoading(true);
      await UserService.editAdminUser(user.id, values);
      onSuccess && onSuccess(values);
    }).finally(() => setLoading());
  };

  const formik = useFormik({
    initialValues: {
      firstName: user ? user["firstName"] : "",
      lastName: user ? user["lastName"] : ""
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
        <div className="row">
          {EDIT_USER_SCHEMA.map((item, index) => {
            const { name, label } = item;
            return (
              <FormControl
                component="fieldset"
                variant="outlined"
                fullWidth
                sx={{
                  marginTop: "10px",
                  "& legend": {
                    width: "auto"
                  }
                }}
                key={index}
              >
                <FormLabel component="legend">
                  {label}
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <OutlinedInput
                  size="large"
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                />
                {formik.touched[name] && (
                  <FormHelperText error={formik.touched[name] && Boolean(formik.errors[name])}>
                    {formik.errors[name]}
                  </FormHelperText>
                )}
              </FormControl>
            );
          })}
        </div>
      </div>
      <Divider sx={{ margin: "20px 0" }} />
      <Stack spacing={1} direction="row">
        <LoadingButton loading={loading} variant="contained" size="large" type="submit">
          Save
        </LoadingButton>
        <LoadingButton
          loading={loading}
          variant="outlined"
          style={{ color: "red", borderColor: "red" }}
          size="large"
          onClick={() => onCancel && onCancel()}
        >
          Cancel
        </LoadingButton>
      </Stack>
    </form>
  );
};
