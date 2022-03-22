import { applyMiddleware, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";
import { handleSagaError } from "@/utils/saga.util";
import { history } from "@/history/history";
import reducers from "./reducers";
import { routerMiddleware } from "connected-react-router";
import sagas from "./sagas";

// middlewared
const sagaMiddleware = createSagaMiddleware({
  onError: handleSagaError
});
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(reducers(history), composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(sagas);

export { store };
