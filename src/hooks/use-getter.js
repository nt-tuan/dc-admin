import React from "react";
export const useGetter = (value) => {
  const ref = React.useRef(value);
  React.useLayoutEffect(() => {
    ref.current = value;
  });
  return React.useCallback(() => ref.current, []);
};
