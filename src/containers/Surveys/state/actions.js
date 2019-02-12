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
  UPLOAD_ATTACHMENT,
  UPDATE_QUESTION,
  GET_BRANCHING_DATA,
  SET_BRANCH,
  QUESTION_CHANGE_ORDER,
  DELETE_SURVEY
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
export function deleteSurvey(data) {
  return {
    type: `${DELETE_SURVEY}_SUBMIT`,
    data
  };
}

export function addQuestion(data) {
  return {
    type: `${ADD_QUESTION}_SUBMIT`,
    data
  };
}

export function getBranchingData(data) {
  return {
    type: `${GET_BRANCHING_DATA}_SUBMIT`,
    data
  };
}

export function setBranch(data) {
  return {
    type: `${SET_BRANCH}_SUBMIT`,
    data
  };
}
export function changeOrder(data) {
  return {
    type: `${QUESTION_CHANGE_ORDER}_SUBMIT`,
    data
  };
}

export function updateQuestion(data) {
  return {
    type: `${UPDATE_QUESTION}_SUBMIT`,
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
