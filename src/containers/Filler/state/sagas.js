import { takeLatest, put } from "redux-saga/effects";
import { requestApi } from "utils/requestApi";
import { push } from "connected-react-router";

import {
  AUTH_URL,
  OPT_IN_URL,
  START_SURVEY_URL,
  SAVE_ANSWER_URL
} from "./constants";

// Auth watchers
export function* authFillerWatcher() {
  yield takeLatest(`${AUTH_URL}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(AUTH_URL, { data }, { filler: true }));
  });
}
export function* authFillerSucceedWatcher() {
  yield takeLatest(`${AUTH_URL}_SUCCEED`, function*({ payload: { data } }) {
    const { survey: { surveyId } = {} } = data;
    yield put(push(surveyId ? "/filler/survey" : "/filler/optin"));
  });
}

// OptIn Checker watchers
export function* optInSubmitWatcher() {
  yield takeLatest(`${OPT_IN_URL}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(OPT_IN_URL, { data }, { filler: true }));
  });
}
export function* optInSucceedWatcher() {
  yield takeLatest(`${OPT_IN_URL}_SUCCEED`, function*({ payload: { data } }) {
    const { survey: { surveyId } = {} } = data;
    if (surveyId) {
      yield put(push("/filler/survey"));
    }
  });
}

// Question Display watchers
export function* startSurveyWatcher() {
  yield takeLatest(`${START_SURVEY_URL}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(START_SURVEY_URL, { data }, { filler: true }));
  });
}
export function* saveAnswerWatcher() {
  yield takeLatest(`${SAVE_ANSWER_URL}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(SAVE_ANSWER_URL, { data }, { filler: true }));
  });
}
