import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from "components/error-boundary/error-boundary.comp";
import { Provider } from "react-redux";
import React from "react";
import Router from "./app-router";
import { SnackbarProvider } from "@/components/snackbar-provider/snackbar-provider.comp";
import { ThemeProvider } from "@mui/material/styles";
import { adminTheme } from "@/theme/admin-theme";
import { createBrowserHistory } from "history";
import { store } from "@/redux/store";

// middlewared
export const history = createBrowserHistory();

export const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={adminTheme}>
        <CssBaseline />
        <Provider store={store}>
          <SnackbarProvider>
            <Router history={history} />
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
