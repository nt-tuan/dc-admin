import { ThemeProvider, createTheme } from "@mui/material/styles";
import { applyMiddleware, compose, createStore } from "redux";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from "components";
import { Provider } from "react-redux";
import React from "react";
import Router from "./router";
import { SnackbarProvider } from "notistack";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { handleSagaError } from "utils/saga.util";
import reducers from "./redux/reducers";
import { routerMiddleware } from "connected-react-router";
import sagas from "./redux/sagas";

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
const mdTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        a {
          text-decoration: none;
        }
      `
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          paddingTop: 8,
          paddingBottom: 8
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          paddingTop: 8,
          paddingBottom: 8
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: "50%",
          left: 0,
          transform: "translate(14px, -50%)"
        }
      }
    }
  },
  typography: {
    h3: {
      color: "inherit",
      fontSize: 26,
      fontWeight: 700
    },
    h4: {
      fontSize: 18,
      lineHeight: 1,
      fontWeight: 700,
      color: "inherit"
    },
    h5: {
      fontSize: 16,
      fontWeight: 700,
      color: "inherit"
    },
    h6: {
      fontSize: 12,
      fontWeight: 700,
      color: "inherit"
    }
  }
});
export const App = () => {
  const notistackRef = React.useRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <ErrorBoundary>
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Provider store={store}>
          <SnackbarProvider
            ref={notistackRef}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            action={(key) => (
              <Button color="inherit" onClick={onClickDismiss(key)}>
                Dismiss
              </Button>
            )}
          >
            <Router history={history} />
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
