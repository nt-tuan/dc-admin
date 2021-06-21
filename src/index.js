import { ErrorBoundary } from "components";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import "utils/monkey-patch.util";
import { handleSagaError } from "utils/saga.util";
import { hotjar } from "hotjar/hotjar";
// app styles
import "./global.scss";
import reducers from "./redux/reducers";
import sagas from "./redux/sagas";
import Router from "./router";
import * as serviceWorker from "./serviceWorker";
import { getHotjarID, getHotjarSV } from "utils/config.util";

// middlewared
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  onError: handleSagaError
});
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

if (getHotjarID() && getHotjarSV()) {
  hotjar(getHotjarID(), getHotjarID());
}

const store = createStore(reducers(history), composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(sagas);

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Router history={history} />
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { store, history };
