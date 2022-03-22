import React from "react";
import countryList from "@/assets/country";
export const Country = React.memo(({ code }) => {
  const country = countryList.find((country) => country.alpha2Code === code);
  return <>{country?.name}</>;
});
