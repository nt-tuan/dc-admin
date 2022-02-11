import { useField, useFormikContext } from "formik";

import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import countryList from "assets/country.json";

const formatPhoneCode = (code) => `+${code}`;
const getCallingCodes = () => {
  const codes = [];
  for (const country of countryList) {
    codes.push(...country.callingCodes);
  }
  return Array.from(new Set(codes)).map(formatPhoneCode);
};
const phonePrefixes = getCallingCodes();
const getPhoneObject = (phone) => {
  if (phone == null)
    return {
      countryCode: null,
      localNumber: ""
    };

  if (!phone.startsWith("+")) {
    return {
      countryCode: null,
      localNumber: phone
    };
  }
  const parts = phone.split(" ", 2);
  return {
    countryCode: parts[0] ?? null,
    localNumber: parts[1] ?? ""
  };
};
const usePhoneField = ({ name, countryFieldName }) => {
  const [field, meta] = useField({ name, type: "text" });
  const [countryField] = useField({ name: countryFieldName });
  const { setFieldValue } = useFormikContext();
  const phone = field.value;
  const [{ countryCode, localNumber }, setPhone] = React.useState(getPhoneObject(phone));
  const country = countryField.value;
  React.useEffect(() => {
    setPhone(getPhoneObject(phone));
  }, [phone]);
  React.useEffect(() => {
    if (!country) return;
    const countryInfo = countryList.find((currentCountry) => {
      return currentCountry.alpha2Code === country;
    });
    if (countryInfo) {
      setPhone((phone) => ({
        ...phone,
        countryCode: formatPhoneCode(countryInfo.callingCodes[0])
      }));
    }
  }, [country]);
  const changeCountryCode = (value) => {
    const newPhone = `${value} ${localNumber}`;
    setFieldValue(name, newPhone);
  };
  const changeLocalNumber = (event) => {
    const value = event.target.value;
    const newPhone = `${countryCode} ${value}`;
    console.log(newPhone);
    setFieldValue(name, newPhone);
  };
  return { meta, countryCode, localNumber, changeCountryCode, changeLocalNumber };
};

export const PhoneField = ({ label, name, placeholder, countryFieldName, ...props }) => {
  const { meta, countryCode, localNumber, changeCountryCode, changeLocalNumber } = usePhoneField({
    name,
    countryFieldName
  });
  const labelId = `phone-field-${name}-label`;
  return (
    <FormControl>
      <Stack direction="row" spacing={1}>
        <Autocomplete
          sx={{ width: 150 }}
          options={phonePrefixes}
          value={countryCode}
          onChange={(_, value) => changeCountryCode(value)}
          renderInput={(params) => <TextField {...params} placeholder="+1" label="Phone Prefix" />}
        />
        <FormControl {...props} sx={{ flexGrow: 1 }}>
          <InputLabel htmlFor={labelId}>{label}</InputLabel>
          <OutlinedInput
            labelId={labelId}
            value={localNumber}
            label={label}
            placeholder={placeholder}
            onChange={changeLocalNumber}
            error={meta.touched && meta.error}
            type="text"
          />
        </FormControl>
      </Stack>
      {meta.touched && meta.error && (
        <FormHelperText error={meta.error} id={`password-field-${name}-helper-text`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
