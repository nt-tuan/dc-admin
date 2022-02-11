import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import React from "react";
import { useField } from "formik";

export const CheckboxField = ({ name, label }) => {
  const [field, meta] = useField({ name, type: "checkbox" });
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox name={field.name} checked={field.value} onChange={field.onChange} />}
        label={label}
      />
      {meta.touched && meta.error && (
        <FormHelperText error={meta.error} id={`password-field-${name}-helper-text`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormGroup>
  );
};
