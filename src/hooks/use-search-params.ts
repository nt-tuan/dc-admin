import { useHistory, useLocation } from "react-router-dom";

import React from "react";

function paramsToObject(entries) {
  const result: Record<string, string> = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

const parseParamsToString = (paramsObject: Record<string, string>) => {
  const params = new URLSearchParams(paramsObject);
  return params.toString();
};

export const useSearchParams: (props?: {
  defaultValue?: Record<string, string>;
}) => [Record<string, string>, (filter: Record<string, string>) => void] = (props) => {
  const { defaultValue } = props || {};
  const { push } = useHistory();
  const { search } = useLocation();
  const [initialParams] = React.useState(defaultValue);
  React.useEffect(() => {
    if (initialParams) {
      push({ search: parseParamsToString(initialParams) });
    }
  }, [push, initialParams]);
  const searchParamsObject = React.useMemo(() => {
    const params = new URLSearchParams(search);
    return paramsToObject(params);
  }, [search]);
  const setSearchParams = React.useCallback(
    (paramsObject) => {
      push({ search: parseParamsToString(paramsObject) });
    },
    [push]
  );
  return [searchParamsObject, setSearchParams];
};
