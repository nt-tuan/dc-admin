import { useField, useFormikContext } from "formik";

import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import React from "react";
import TextField from "@mui/material/TextField";

export const AutocompleteField = ({ name, dataSource, label, placeholder, ...props }) => {
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
    <FormControl error={Boolean(showError)} {...props}>
      <Autocomplete
        value={field.value}
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        getOptionLabel={(item) => (dataMap[item] ? dataMap[item].label : "")}
        renderInput={(params) => <TextField {...params} required={props.required} label={label} />}
      />
      {showError && (
        <FormHelperText error={meta.error} id={`select-field-${name}-helper-text`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
