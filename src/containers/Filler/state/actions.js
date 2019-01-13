import {
  AUTH_URL,
  FILLER_LOGOUT,
  OPT_IN_URL,
  START_SURVEY_URL,
  SAVE_ANSWER_URL,
  RESET_SURVEY_DATA
} from "./constants";

// Auth actions
export function authenticateFiller(data) {
  return {
    type: `${AUTH_URL}_SUBMIT`,
    payload: data
  };
}
export function fillerLogout() {
  return {
    type: FILLER_LOGOUT
  };
}

// OptIn Checker actions
export function optInSurvey(data) {
  return {
    type: `${OPT_IN_URL}_SUBMIT`,
    payload: data
  };
}

// Question Display actions
export function startSurvey(data) {
  return {
    type: `${START_SURVEY_URL}_SUBMIT`,
    payload: data
  };
}
export function submitAnswer(data) {
  return {
    type: `${SAVE_ANSWER_URL}_SUBMIT`,
    payload: data
  };
}
export function resetSurveyData() {
  return {
    type: RESET_SURVEY_DATA
  };
}
