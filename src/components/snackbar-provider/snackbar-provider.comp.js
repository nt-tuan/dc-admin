import { SnackbarProvider as Provider } from "notistack";
import React from "react";

export const globalSnackbarRef = { current: null };
export const SnackbarProvider = ({ children }) => {
  const notistackRef = React.useRef();
  React.useEffect(() => {
    globalSnackbarRef.current = notistackRef.current;
  }, []);
  return (
    <Provider
      ref={notistackRef}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      content={(key, message) => <div key={key}>{message}</div>}
      maxSnack={5}
    >
      {children}
    </Provider>
  );
};
