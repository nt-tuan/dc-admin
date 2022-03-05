import React from "react";
import { useLocation } from "react-router-dom";

export const useGetSearchParams = (keys) => {
  const location = useLocation();
  return React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    if (Array.isArray(keys)) {
      const values = [];
      for (const key of keys) {
        values.push(params.get(key));
      }
      return values;
    }
    return params.get(keys);
  }, [location, keys]);
};
