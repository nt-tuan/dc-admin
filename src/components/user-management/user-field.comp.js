import { Box, FormControl, FormHelperText, TextField } from "@mui/material";
import { memo } from "react";
import { USER_SCHEMA } from "./schema";

const AdminUserField = ({ formik, label, name, ...rest }) => {
  return (
    <FormControl
      component="fieldset"
      variant="outlined"
      sx={{
        marginTop: name !== USER_SCHEMA.firstName.name ? 3 : 0,
        "& legend": {
          width: "auto"
        },
        width: 400
      }}
    >
      <TextField
        error={formik.touched[name] && Boolean(formik.errors[name])}
        label={
          <>
            {label}
            <Box component="span" sx={{ color: "error.main", paddingLeft: 0.5 }}>
              *
            </Box>
          </>
        }
        size="large"
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        {...rest}
      />
      {formik.touched[name] && (
        <FormHelperText error={formik.touched[name] && Boolean(formik.errors[name])}>
          {formik.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default memo(AdminUserField);
