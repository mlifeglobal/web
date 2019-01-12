import requestApiWatcher from "utils/requestApi";

import {
  loginSubmitWatcher,
  loginSucceedWatcher
} from "containers/Login/state/sagas";
import {
  signUpSubmitWatcher,
  signUpSucceedWatcher
} from "containers/SignUp/state/sagas";
import {
  requestPasswordWatcher,
  resetPasswordWatcher,
  resetSucceedWatcher
} from "containers/ForgotPassword/state/sagas";

export default sagaMiddleware => {
  sagaMiddleware.run(requestApiWatcher);

  // Login
  sagaMiddleware.run(loginSubmitWatcher);
  sagaMiddleware.run(loginSucceedWatcher);

  // SignUp
  sagaMiddleware.run(signUpSubmitWatcher);
  sagaMiddleware.run(signUpSucceedWatcher);

  // ForgotPassword
  sagaMiddleware.run(requestPasswordWatcher);
  sagaMiddleware.run(resetPasswordWatcher);
  sagaMiddleware.run(resetSucceedWatcher);
};
