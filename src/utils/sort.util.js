//Takes into account Unicode and non-English alphabets
export const sortAlphabetically = (stringA, stringB) => {
  return stringA.localeCompare(stringB, "en", { sensitivity: "base" });
};
