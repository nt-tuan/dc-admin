import MuiTextField from "@mui/material/TextField";
import { useField } from "formik";

export const TextField = ({ name, fieldConfig, ...props }) => {
  const [field, meta] = useField({ name, type: "text", ...fieldConfig });

  return (
    <MuiTextField
      value={field.value}
      name={field.name}
      onChange={field.onChange}
      error={meta.touched && meta.error}
      helperText={meta.touched && meta.error}
      {...props}
    />
  );
};
