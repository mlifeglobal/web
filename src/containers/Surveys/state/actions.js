/** Surveys actions */
import {
  SURVEYS_URL,
  EDIT_SURVEY,
  SURVEY_CREATE,
  TOGGLE_STATE,
  UPDATE_DETAILS,
  FETCH_QUESTIONS,
  UPDATE_PLATFORMS,
  DELETE_QUESTION,
  ADD_QUESTION,
  UPLOAD_ATTACHMENT
} from "./constants";

export function fetchSurveys(data) {
  return {
    type: `${SURVEYS_URL}_SUBMIT`,
    data
  };
}

export function createSurvey(data) {
  return {
    type: `${SURVEY_CREATE}_SUBMIT`,
    payload: data
  };
}
export function editSurvey(data) {
  return {
    type: EDIT_SURVEY,
    payload: data
  };
}

export function toggleState(data) {
  return {
    type: `${TOGGLE_STATE}_SUBMIT`,
    data
  };
}

export function updateDetails(data) {
  return {
    type: `${UPDATE_DETAILS}_SUBMIT`,
    data
  };
}

export function fetchQuestions(data) {
  return {
    type: `${FETCH_QUESTIONS}_SUBMIT`,
    data
  };
}

export function deleteQuestion(data) {
  return {
    type: `${DELETE_QUESTION}_SUBMIT`,
    data
  };
}

export function addQuestion(data) {
  return {
    type: `${ADD_QUESTION}_SUBMIT`,
    data
  };
}

export function uploadAttachment(data) {
  return {
    type: `${UPLOAD_ATTACHMENT}_SUBMIT`,
    data
  };
}

export function updatePlatforms(data) {
  return {
    type: `${UPDATE_PLATFORMS}_SUBMIT`,
    data
  };
}