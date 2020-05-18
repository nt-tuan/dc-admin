import "c3/c3.min.css";
import { ErrorBoundary } from "components";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import "lightgallery.js/dist/css/lightgallery.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { LightgalleryProvider } from "react-lightgallery";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import "utils/monkey-patch.util";
import { handleSagaError } from "utils/saga.util";
// app styles
import "./global.scss";
import reducers from "./redux/reducers";
import sagas from "./redux/sagas";
import Router from "./router";
import * as serviceWorker from "./serviceWorker";

// middlewared
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  onError: handleSagaError
});
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];
// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(reducers(history), composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(sagas);

// Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DNS });

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <LightgalleryProvider>
        <Router history={history} />
      </LightgalleryProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { store, history };
