import { takeLatest, put } from "redux-saga/effects";
import { requestApi } from "utils/requestApi";

import {
  SURVEYS_URL,
  SURVEY_CREATE,
  TOGGLE_STATE,
  UPDATE_DETAILS,
  FETCH_QUESTIONS,
  UPDATE_PLATFORMS,
  DELETE_QUESTION,
  ADD_QUESTION,
  UPLOAD_ATTACHMENT,
  UPDATE_QUESTION,
  GET_BRANCHING_DATA,
  SET_BRANCH,
  QUESTION_CHANGE_ORDER
} from "./constants";

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
    createSurvey(payload)
  );
}

export function* toggleState(data) {
  yield put(requestApi(TOGGLE_STATE, { data }));
}

export function* toggleStateWatcher() {
  yield takeLatest(`${TOGGLE_STATE}_SUBMIT`, ({ data }) => toggleState(data));
}

export function* updateDetails(data) {
  yield put(requestApi(UPDATE_DETAILS, { data }));
}

export function* updateDetailsWatcher() {
  yield takeLatest(`${UPDATE_DETAILS}_SUBMIT`, ({ data }) =>
    updateDetails(data)
  );
}
export function* fetchQuestons(data) {
  yield put(requestApi(FETCH_QUESTIONS, { data }));
}

export function* fetchQuestonsWatcher() {
  yield takeLatest(`${FETCH_QUESTIONS}_SUBMIT`, ({ data }) =>
    fetchQuestons(data)
  );
}

export function* updatePlatforms(data) {
  yield put(requestApi(UPDATE_PLATFORMS, { data }));
}

export function* updatePlatformsWatcher() {
  yield takeLatest(`${UPDATE_PLATFORMS}_SUBMIT`, ({ data }) =>
    updatePlatforms(data)
  );
}

export function* deleteQuestion(data) {
  yield put(requestApi(DELETE_QUESTION, { data }));
}

export function* deleteQuestionWatcher() {
  yield takeLatest(`${DELETE_QUESTION}_SUBMIT`, ({ data }) =>
    deleteQuestion(data)
  );
}

export function* addQuestion(data) {
  yield put(requestApi(ADD_QUESTION, { data }));
}

export function* addQuestionWatcher() {
  yield takeLatest(`${ADD_QUESTION}_SUBMIT`, ({ data }) => addQuestion(data));
}

export function* getBranchingData(data) {
  yield put(requestApi(GET_BRANCHING_DATA, { data }));
}

export function* getBranchingDataWatcher() {
  yield takeLatest(`${GET_BRANCHING_DATA}_SUBMIT`, ({ data }) =>
    getBranchingData(data)
  );
}

export function* setBranch(data) {
  yield put(requestApi(SET_BRANCH, { data }));
}

export function* setBranchWatcher() {
  yield takeLatest(`${SET_BRANCH}_SUBMIT`, ({ data }) => setBranch(data));
}
export function* changeOrder(data) {
  yield put(requestApi(QUESTION_CHANGE_ORDER, { data }));
}

export function* changeOrderWatcher() {
  yield takeLatest(`${QUESTION_CHANGE_ORDER}_SUBMIT`, ({ data }) =>
    changeOrder(data)
  );
}
export function* updateQuestion(data) {
  yield put(requestApi(UPDATE_QUESTION, { data }));
}

export function* updateQuestionWatcher() {
  yield takeLatest(`${UPDATE_QUESTION}_SUBMIT`, ({ data }) =>
    updateQuestion(data)
  );
}

export function* uploadAttachment(data) {
  yield put(
    requestApi(
      UPLOAD_ATTACHMENT,
      data,
      {},
      "post",
      {
        headers: { "Content-Type": "multipart/form-data" }
      },
      true
    )
  );
}

export function* uploadAttachmentWatcher() {
  yield takeLatest(`${UPLOAD_ATTACHMENT}_SUBMIT`, ({ data }) =>
    uploadAttachment(data)
  );
}
