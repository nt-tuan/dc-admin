export const cleanAndParseString = (str) => {
  if (str === undefined) {
    return;
  }
  const cleanedStr = str.replace(/\s\s+/g, " ");
  return cleanedStr.replace(/ /g, "-");
};
