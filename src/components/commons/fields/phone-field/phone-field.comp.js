import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import countryList from "@/assets/country";
import { useField, useFormikContext } from "formik";
import React from "react";

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
const getPhoneString = (countryCode, phoneNumber) => {
  if (!countryCode) return phoneNumber;
  return `${countryCode} ${phoneNumber}`;
};
export const usePhoneField = ({ name, countryFieldName }) => {
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
    setFieldValue(name, getPhoneString(value, localNumber));
  };
  const changeLocalNumber = (event) => {
    const value = event.target.value;
    setFieldValue(name, getPhoneString(countryCode, value));
  };
  return { meta, countryCode, localNumber, changeCountryCode, changeLocalNumber };
};

export const PhoneField = ({
  label,
  name,
  placeholder,
  countryFieldName,
  fullWidth,
  prefixeDisableClearable,
  prefixWidth = 120,
  ...props
}) => {
  const { meta, countryCode, localNumber, changeCountryCode, changeLocalNumber } = usePhoneField({
    name,
    countryFieldName
  });
  const labelId = `phone-field-${name}-label`;
  return (
    <FormControl fullWidth={fullWidth}>
      <Stack direction="row" spacing={1}>
        <Autocomplete
          disableClearable={prefixeDisableClearable}
          sx={{ width: prefixWidth }}
          options={phonePrefixes}
          value={countryCode}
          onChange={(_, value) => changeCountryCode(value)}
          renderInput={(params) => <TextField {...params} placeholder="+1" label="Phone Prefix" />}
        />
        <FormControl {...props} sx={{ flexGrow: 1 }}>
          <InputLabel htmlFor={labelId}>{label}</InputLabel>
          <OutlinedInput
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
