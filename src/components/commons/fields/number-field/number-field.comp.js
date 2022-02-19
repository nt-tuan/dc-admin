import { useField, useFormikContext } from "formik";

import MuiTextField from "@mui/material/TextField";
import React from "react";
import ReactNumberFormat from "react-number-format";

export const NumberFormat = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <ReactNumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

export const NumberField = ({ name, fieldConfig, ...props }) => {
  const [field, meta] = useField({ name, type: "text", ...fieldConfig });
  const { setFieldValue } = useFormikContext();
  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <MuiTextField
      value={field.value}
      name={field.name}
      onChange={handleChange}
      error={meta.touched && meta.error}
      helperText={meta.touched && meta.error}
      InputProps={{ ...props?.InputProps, inputComponent: NumberFormat }}
      {...props}
    />
  );
};
