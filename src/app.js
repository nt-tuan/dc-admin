import { ThemeProvider } from "@mui/material/styles";
import { applyMiddleware, compose, createStore } from "redux";

import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from "components/error-boundary/error-boundary.comp";
import { Provider } from "react-redux";
import React from "react";
import Router from "./app-router";
import { SnackbarProvider } from "notistack";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { handleSagaError } from "utils/saga.util";
import reducers from "./redux/reducers";
import { routerMiddleware } from "connected-react-router";
import sagas from "./redux/sagas";
import { adminTheme } from "@/theme/admin-theme";

// middlewared
export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  onError: handleSagaError
});
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

export const store = createStore(
  reducers(history),
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(sagas);
export const App = () => {
  const notistackRef = React.useRef();
  return (
    <ErrorBoundary>
      <ThemeProvider theme={adminTheme}>
        <CssBaseline />
        <Provider store={store}>
          <SnackbarProvider
            ref={notistackRef}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            content={(key, message) => <div key={key}>{message}</div>}
            maxSnack={5}
          >
            <Router history={history} />
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
