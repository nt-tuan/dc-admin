import { generatePath, useHistory, useParams } from "react-router-dom";

import React from "react";

export const usePathParams = (path) => {
  const { push } = useHistory();
  const params = useParams();
  const setSearchParams = React.useCallback(
    (paramsObject) => {
      const pathname = generatePath(path, paramsObject);
      push({ pathname });
    },
    [push, path]
  );
  return [params, setSearchParams];
};
