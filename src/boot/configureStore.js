import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./reducers";

export const history = createBrowserHistory();

export default () => {
  const preloadedState = {};

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(createSagaMiddleware(), routerMiddleware(history)))
  );

  return store;
};
