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
import { fetchHomeDataWatcher } from "containers/Home/state/sagas";
import {
  authFillerWatcher,
  authFillerSucceedWatcher,
  optInSubmitWatcher,
  optInSucceedWatcher,
  startSurveyWatcher,
  saveAnswerWatcher
} from "containers/Filler/state/sagas";

import {
  fetchSurveysWatcher,
  createSurveyWatcher
} from "containers/Surveys/state/sagas";

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

  // Home
  sagaMiddleware.run(fetchHomeDataWatcher);

  // Filler
  sagaMiddleware.run(authFillerWatcher);
  sagaMiddleware.run(authFillerSucceedWatcher);
  sagaMiddleware.run(optInSubmitWatcher);
  sagaMiddleware.run(optInSucceedWatcher);
  sagaMiddleware.run(startSurveyWatcher);
  sagaMiddleware.run(saveAnswerWatcher);

  // Survets
  sagaMiddleware.run(fetchSurveysWatcher);
  sagaMiddleware.run(createSurveyWatcher);
};
