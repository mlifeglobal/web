/*
 *
 * Surveys actions
 *
 */

import { SURVEYS_URL, EDIT_SURVEY, SURVEY_CREATE } from './constants';

export function fetchSurveys(data) {
  return {
    type: `${SURVEYS_URL}_SUBMIT`,
    data,
  };
}

export function createSurvey(data) {
  return {
    type: `${SURVEY_CREATE}_SUBMIT`,
    payload: data,
  };
}
export function editSurvey(data) {
  return {
    type: EDIT_SURVEY,
    payload: data,
  };
}
