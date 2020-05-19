//Takes into account Unicode and non-English alphabets
export const sortAlphabetically = (stringA, stringB) =>
  stringA.localeCompare(stringB, "en", { sensitivity: "base" });
