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
  QUESTION_CHANGE_ORDER,
  UPLOAD_ATTACHMENT,
  DELETE_SURVEY
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
    case `${TOGGLE_STATE}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${TOGGLE_STATE}_SUCCEED`:
      return {
        ...state,
        loading: false,
        currentSurvey: action.payload.survey,
        message: action.payload.message,
        requestSucceed: true
      };
    case `${TOGGLE_STATE}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    case `${UPDATE_DETAILS}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${UPDATE_DETAILS}_SUCCEED`:
      return {
        ...state,
        loading: false,
        currentSurvey: action.payload.survey,
        message: action.payload.message,
        requestSucceed: true
      };
    case `${UPDATE_DETAILS}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    case `${FETCH_QUESTIONS}_SUCCEED`:
      return { ...state, loading: false, questions: action.payload.questions };
    case `${ADD_QUESTION}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${ADD_QUESTION}_SUCCEED`:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
        message: action.payload.message,
        currentSurvey: action.payload.survey,
        requestSucceed: true
      };
    case `${ADD_QUESTION}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    case `${UPDATE_QUESTION}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${UPDATE_QUESTION}_SUCCEED`:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
        message: action.payload.message,
        requestSucceed: true
      };
    case `${UPDATE_QUESTION}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    case `${DELETE_QUESTION}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${DELETE_QUESTION}_SUCCEED`:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
        message: action.payload.message,
        currentSurvey: action.payload.survey,
        requestSucceed: true
      };
    case `${DELETE_QUESTION}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    case `${DELETE_SURVEY}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${DELETE_SURVEY}_SUCCEED`:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        requestSucceed: true
      };
    case `${DELETE_SURVEY}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    case `${GET_BRANCHING_DATA}_SUCCEED`:
      return { ...state, loading: false, branchData: action.payload.data };
    case `${GET_BRANCHING_DATA}_SUBMIT`:
      return {
        ...state,
        loading: true,
        branchData: undefined
      };
    case `${UPDATE_PLATFORMS}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${UPDATE_PLATFORMS}_SUCCEED`:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        currentSurvey: action.payload.survey,
        requestSucceed: true
      };
    case `${UPDATE_PLATFORMS}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    case `${SET_BRANCH}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${SET_BRANCH}_SUCCEED`:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
        message: action.payload.message,
        requestSucceed: true
      };
    case `${SET_BRANCH}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    case `${UPLOAD_ATTACHMENT}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${UPLOAD_ATTACHMENT}_SUCCEED`:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
        message: action.payload.message,
        requestSucceed: true
      };
    case `${UPLOAD_ATTACHMENT}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    case `${QUESTION_CHANGE_ORDER}_SUBMIT`:
      return {
        ...state,
        message: ""
      };
    case `${QUESTION_CHANGE_ORDER}_SUCCEED`:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        questions: action.payload.questions,
        requestSucceed: true
      };
    case `${QUESTION_CHANGE_ORDER}_FAIL`:
      return {
        ...state,
        loading: false,
        message: "Unexpected error.",
        requestSucceed: false
      };
    default:
      return state;
  }
}

export default surveysReducer;
