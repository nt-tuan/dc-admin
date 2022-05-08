import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { FieldHookConfig, useField } from "formik";

interface Props {
  fieldConfig?: Partial<FieldHookConfig<any>>;
}
export const TextField = ({ name, fieldConfig, required, ...props }: TextFieldProps & Props) => {
  const [field, meta] = useField({ name: name ?? "", type: "text", ...fieldConfig });

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
