import { useField, useFormikContext } from "formik";

import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import React from "react";
import TextField from "@mui/material/TextField";

export const AutocompleteField = ({
  name,
  dataSource,
  label,
  placeholder,
  required,
  loading,
  disabled,
  filterOptions,
  ...props
}) => {
  const [field, meta] = useField({ name, type: "search" });
  const { setFieldValue } = useFormikContext();
  const showError = Boolean(meta.touched && meta.error);
  const dataMap = React.useMemo(() => {
    const map = {};
    for (const item of dataSource) {
      map[item.value] = item;
    }
    return map;
  }, [dataSource]);
  const options = React.useMemo(() => {
    return dataSource.map((item) => item.value);
  }, [dataSource]);
  const handleChange = (_, value) => {
    setFieldValue(name, value);
  };

  return (
    <FormControl error={showError} {...props}>
      <Autocomplete
        loading={loading}
        disabled={disabled}
        value={field.value}
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        filterOptions={filterOptions}
        getOptionLabel={(item) => (dataMap[item] ? dataMap[item].label : "")}
        renderInput={(params) => (
          <TextField
            {...params}
            disabled={disabled}
            InputLabelProps={{ ...params?.InputLabelProps, error: showError, disabled, required }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
            error={showError}
            label={label}
          />
        )}
      />
      {showError && (
        <FormHelperText error={showError} id={`select-field-${name}-helper-text`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
