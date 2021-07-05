export const getURLParams = (queryParams) => {
  if (!queryParams) return;

  //Remove the question mark
  const sanitizeString = queryParams.split("?");

  return sanitizeString[1].split("&").map((param) => {
    let temp = param.split("=");
    return { [temp[0]]: temp[1] };
  });
};
