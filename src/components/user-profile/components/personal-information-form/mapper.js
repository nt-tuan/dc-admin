import countryList from "@/assets/country.json";
export const parseFormValues = (values) => {
  const { firstName, lastName, phone } = values;
  const prefix = phone?.split(" ")[0]?.substring(1);
  const country = countryList.find((currentCountry) =>
    currentCountry.callingCodes.includes(prefix)
  );
  return { firstName, lastName, phone, country: country?.alpha2Code };
};
