import requestApiWatcher from "utils/requestApi";

import {
  loginSubmitWatcher,
  loginSucceedWatcher
} from "containers/Login/state/sagas";

export default sagaMiddleware => {
  sagaMiddleware.run(requestApiWatcher);

  // Login
  sagaMiddleware.run(loginSubmitWatcher);
  sagaMiddleware.run(loginSucceedWatcher);
};
