import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Select from "@mui/material/Select";
import { useField } from "formik";

export const SelectField = ({
  name,
  dataSource,
  label,
  onChangeValue = undefined,
  required = false,
  ...props
}) => {
  const [field, meta] = useField({ name, type: "search" });
  const labelId = `select-field-${name}-label`.replace(".", "__");
  const showError = Boolean(meta.touched && meta.error);
  const handleChange = (...params) => {
    field.onChange(...params);
    if (onChangeValue) {
      onChangeValue(...params);
    }
  };

  return (
    <FormControl error={showError} {...props}>
      <InputLabel required={required} htmlFor={labelId}>
        {label}
      </InputLabel>
      <Select
        name={name}
        labelId={labelId}
        value={field.value}
        label={label}
        onChange={handleChange}
      >
        {dataSource.map(({ value, label: menuLabel, disabled }) => (
          <MenuItem disabled={disabled} key={value} value={value}>
            {menuLabel}
          </MenuItem>
        ))}
      </Select>
      {showError && (
        <FormHelperText id={`select-field-${name}-helper-text`} required={required}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
