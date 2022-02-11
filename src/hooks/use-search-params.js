import React from "react";
import { useHistory, useLocation } from "react-router-dom";
function paramsToObject(entries) {
  const result = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}
export const useSearchParams = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const searchParamsObject = React.useMemo(() => {
    const params = new URLSearchParams(search);
    return paramsToObject(params);
  }, [search]);
  const setSearchParams = React.useCallback(
    (paramsObject) => {
      const params = new URLSearchParams(paramsObject);
      push({ search: params.toString() });
    },
    [push]
  );
  return [searchParamsObject, setSearchParams];
};
