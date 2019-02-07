import {
  SURVEYS_URL,
  SURVEY_CREATE,
  EDIT_SURVEY,
  TOGGLE_STATE,
  UPDATE_DETAILS,
  FETCH_QUESTIONS,
  ADD_QUESTION,
  UPDATE_QUESTION,
  GET_BRANCHING_DATA,
  UPDATE_PLATFORMS,
  DELETE_QUESTION,
  SET_BRANCH,
  QUESTION_CHANGE_ORDER
} from "./constants";

export const initialState = {
  data: {
    surveys: [],
    surveysCount: 0
  },
  currentSurvey: undefined,
  questions: []
};

function surveysReducer(state = initialState, action) {
  switch (action.type) {
    case `${SURVEYS_URL}_SUBMIT`:
      return { ...state, loading: true };
    case `${SURVEYS_URL}_SUCCEED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${SURVEY_CREATE}_SUCCEED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${SURVEYS_URL}_FAIL`:
      return { ...state, loading: false };
    case EDIT_SURVEY:
      return { ...state, loading: false, currentSurvey: action.payload };
    case `${TOGGLE_STATE}_SUCCEED`:
      return {
        ...state,
        loading: false,
        currentSurvey: action.payload.survey,
        message: action.payload.message
      };
    case `${UPDATE_DETAILS}_SUCCEED`:
      return {
        ...state,
        loading: false,
        currentSurvey: action.payload.survey,
        message: action.payload.message
      };
    case `${FETCH_QUESTIONS}_SUCCEED`:
      return { ...state, loading: false, questions: action.payload.questions };
    case `${ADD_QUESTION}_SUCCEED`:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
        message: action.payload.message,
        currentSurvey: action.payload.survey
      };
    case `${UPDATE_QUESTION}_SUCCEED`:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
        message: action.payload.message
      };
    case `${DELETE_QUESTION}_SUCCEED`:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
        message: action.payload.message,
        currentSurvey: action.payload.survey
      };
    case `${GET_BRANCHING_DATA}_SUCCEED`:
      return { ...state, loading: false, branchData: action.payload.data };
    case `${GET_BRANCHING_DATA}_SUBMIT`:
      return {
        ...state,
        loading: true,
        branchData: undefined
      };
    case `${UPDATE_PLATFORMS}_SUCCEED`:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        currentSurvey: action.payload.survey
      };
    case `${SET_BRANCH}_SUCCEED`:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
        message: action.payload.message
      };
    case `${QUESTION_CHANGE_ORDER}_SUCCEED`:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        questions: action.payload.questions
      };
    default:
      return state;
  }
}

export default surveysReducer;
