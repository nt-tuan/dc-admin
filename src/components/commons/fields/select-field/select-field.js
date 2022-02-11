import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Select from "@mui/material/Select";
import { useField } from "formik";

export const SelectField = ({ name, dataSource, label, ...props }) => {
  const [field, meta] = useField({ name, type: "search" });
  const labelId = `select-field-${name}-label`;
  const showError = Boolean(meta.touched && meta.error);
  return (
    <FormControl {...props}>
      <InputLabel htmlFor={labelId}>{label}</InputLabel>
      <Select
        name={name}
        labelId={labelId}
        value={field.value}
        label={label}
        onChange={field.onChange}
        error={showError}
      >
        {dataSource.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {showError && (
        <FormHelperText error={meta.error} id={`select-field-${name}-helper-text`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
