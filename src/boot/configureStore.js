import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { throttle } from "lodash";
import { saveState, loadState } from "utils/localStorage";

import createRootReducer from "./reducers";
import runSagas from "./sagas";

export const history = createBrowserHistory();

export default () => {
  const preloadedState = loadState();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history),
    preloadedState || {},
    compose(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );

  store.subscribe(
    throttle(() => {
      const { auth } = store.getState();
      saveState({
        auth: { data: auth.data }
      });
    }, 1000)
  );

  runSagas(sagaMiddleware);

  return store;
};
