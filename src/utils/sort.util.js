//Takes into account Unicode and non-English alphabets
export const sortAlphabetically = (stringA, stringB) => {
  return stringA && stringA.localeCompare(stringB, "en", { sensitivity: "base" });
};
