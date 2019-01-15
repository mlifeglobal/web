import { takeLatest, put } from 'redux-saga/effects';
import { requestApi } from 'utils/requestApi';

import { SURVEYS_URL, SURVEY_CREATE } from './constants';

export function* fetchSurveys(data) {
  yield put(requestApi(SURVEYS_URL, { data }));
}

export function* fetchSurveysWatcher() {
  yield takeLatest(`${SURVEYS_URL}_SUBMIT`, ({ data }) => fetchSurveys(data));
}

export function* createSurvey(data) {
  yield put(requestApi(SURVEY_CREATE, { data }));
}

export function* createSurveyWatcher() {
  yield takeLatest(`${SURVEY_CREATE}_SUBMIT`, ({ payload }) =>
    createSurvey(payload),
  );
}
