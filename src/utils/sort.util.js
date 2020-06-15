import { toNumber } from "./general.util";

//Takes into account Unicode and non-English alphabets
export const sortAlphabetically = (stringA, stringB) => {
  return stringA && stringA.localeCompare(stringB, "en", { sensitivity: "base" });
};

export const sortPrice = (priceA, priceB) => {
  return toNumber(priceA) - toNumber(priceB);
};
