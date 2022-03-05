import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from "components/error-boundary/error-boundary.comp";
import { Provider } from "react-redux";
import { QueryClientProvider } from "./providers/query-client-provider";
import React from "react";
import Router from "./app-router";
import { SnackbarProvider } from "@/components/snackbar-provider/snackbar-provider.comp";
import { ThemeProvider } from "@mui/material/styles";
import { adminTheme } from "@/theme/admin-theme";
import { createBrowserHistory } from "history";
import { store } from "@/redux/store";

export const history = createBrowserHistory();
export const App = () => {
  return (
    <ThemeProvider theme={adminTheme}>
      <ErrorBoundary>
        <SnackbarProvider>
          <QueryClientProvider>
            <CssBaseline />
            <Provider store={store}>
              <Router history={history} />x
            </Provider>
          </QueryClientProvider>
        </SnackbarProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
