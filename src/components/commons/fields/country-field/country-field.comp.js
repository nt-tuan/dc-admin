import { AutocompleteField } from "../autocomplete-field/autocomplete-field.comp";
import React from "react";
import countryList from "@/assets/country";

export const CountryField = (props) => {
  const dataSource = React.useMemo(() => {
    return countryList.map((item) => ({
      value: item.alpha2Code,
      label: item.name
    }));
  }, []);

  return <AutocompleteField {...props} dataSource={dataSource} />;
};
