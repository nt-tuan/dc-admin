import { COUNTRY_REQUIRED_ERR } from "commons/consts";
import { createFormErrorComp } from "utils";

export const COUNTRY_SCHEMA = {
  label: "Country",
  placeholder: "Country",
  required: {
    errMsg: createFormErrorComp(COUNTRY_REQUIRED_ERR)
  },
  initialValue: (countryList, countryName, initialCountryName) => {
    const country = countryList.find((c) => c.alpha2Code === initialCountryName);
    return country ? country.name : null;
  },
  onChange: ({ countryList, selectedValue }) => {
    const selectedCountry = countryList.find((item) => item.name === selectedValue);
    return selectedCountry;
  }
};
