import {
  SURVEYS_URL,
  SURVEY_CREATE,
  EDIT_SURVEY,
  TOGGLE_STATE,
  UPDATE_DETAILS,
  FETCH_QUESTIONS,
  ADD_QUESTION
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
  console.log(action.payload);
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
      return { ...state, loading: false, questions: action.payload.questions };

    default:
      return state;
  }
}

export default surveysReducer;