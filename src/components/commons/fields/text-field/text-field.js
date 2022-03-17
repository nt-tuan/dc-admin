import MuiTextField from "@mui/material/TextField";
import { useField } from "formik";

export const TextField = ({ name, fieldConfig, required, ...props }) => {
  const [field, meta] = useField({ name, type: "text", ...fieldConfig });

  return (
    <MuiTextField
      value={field.value}
      name={field.name}
      onChange={field.onChange}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      required={required}
      {...props}
    />
  );
};
