import { memo } from "react";
import { Box, FormControl, FormHelperText, Grid, TextField } from "@mui/material";

const columnGridItem = {
  marginTop: 4,
  xs: 12,
  sm: 6,
  md: 5,
  lg: 5,
  xl: 4
};

const Label = ({ label, isRequired }) => {
  return (
    <>
      {label}
      {isRequired && (
        <Box component="span" sx={{ color: "error.main", paddingLeft: 0.5 }}>
          *
        </Box>
      )}
    </>
  );
};

const TextError = ({ formik, name }) => {
  return (
    <>
      {formik.touched[name] && (
        <FormHelperText error={formik.touched[name] && Boolean(formik.errors[name])}>
          {formik.errors[name]}
        </FormHelperText>
      )}
    </>
  );
};

const AdminUserField = ({ formik, label, name, isRequired = true, ...rest }) => {
  return (
    <FormControl component="fieldset" variant="outlined" sx={{ width: 392, maxWidth: "100%" }}>
      <TextField
        error={formik.touched[name] && Boolean(formik.errors[name])}
        label={<Label label={label} isRequired={isRequired} />}
        size="large"
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        {...rest}
      />
      <TextError formik={formik} name={name} />
    </FormControl>
  );
};

const GridFieldItem = ({ formik, label, name, ...rest }) => {
  return (
    <Grid item {...columnGridItem}>
      <AdminUserField formik={formik} label={label} name={name} {...rest} />
    </Grid>
  );
};

export default memo(GridFieldItem);
