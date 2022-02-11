import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useField } from "formik";

export const PasswordField = ({ inputProps, label, name, disabled, placeholder, ...props }) => {
  const [field, meta] = useField({ name, type: "text" });
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const handleClickShowPassword = () => setPasswordVisible((value) => !value);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const id = `password-field-${name}`;
  return (
    <FormControl {...props}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={field.name}
        value={field.value}
        label={label}
        placeholder={placeholder}
        onChange={field.onChange}
        error={meta.touched && meta.error}
        disabled={disabled}
        type={passwordVisible ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...inputProps}
      />
      {meta.touched && meta.error && (
        <FormHelperText error={meta.error} id={`password-field-${name}-helper-text`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
