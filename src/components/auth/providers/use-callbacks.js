import React from "react";
export const useCallbackEvents = () => {
  const callbacksRef = React.useRef({});
  const register = React.useCallback((callbackName, fn) => {
    callbacksRef.current = { ...callbacksRef.current, [callbackName]: fn };
  }, []);
  const { onSuccess, onReady, onError } = callbacksRef.current;
  return [{ onSuccess, onReady, onError }, register];
};
