import { useField, useFormikContext } from "formik";

import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export const AutocompleteField = ({
  name,
  dataSource,
  label,
  placeholder,
  required = false,
  loading = false,
  disabled = false,
  filterOptions = undefined,
  endAdornment = undefined,
  fullWidth = true,
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
    <FormControl fullWidth={fullWidth} error={showError} {...props}>
      <Autocomplete
        loading={loading}
        fullWidth={fullWidth}
        disabled={disabled}
        value={field.value}
        options={options}
        onChange={handleChange}
        filterOptions={filterOptions}
        getOptionLabel={(item) => (dataMap[item] ? dataMap[item].label : "")}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              disabled={disabled}
              InputLabelProps={{ ...params?.InputLabelProps, error: showError, disabled, required }}
              InputProps={{
                ...params.InputProps,
                placeholder,
                endAdornment: (
                  <>
                    <Stack direction="row" alignItems="center" mr="-10px">
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {endAdornment}
                    </Stack>
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
              error={showError}
              label={label}
            />
          );
        }}
      />
      {showError && (
        <FormHelperText error={showError} id={`select-field-${name}-helper-text`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
