import {
  AUTH_URL,
  FILLER_LOGOUT,
  OPT_IN_URL,
  START_SURVEY_URL,
  SAVE_ANSWER_URL,
  RESET_SURVEY_DATA
} from "./constants";

export const initialState = {
  data: {}, // hold participant data
  survey: {}, // hold current survey data
  loading: false,
  error: undefined
};

function fillerReducer(state = initialState, action) {
  const {
    payload: { data: { participant, survey } = {} } = {},
    error: { value: errorMessage = "" } = {}
  } = action;

  switch (action.type) {
    // Filler Auth cases
    case `${AUTH_URL}_SUBMIT`:
      return {
        ...initialState,
        loading: true
      };
    case `${AUTH_URL}_SUCCEED`:
      return {
        ...initialState,
        data: participant,
        survey
      };
    case `${AUTH_URL}_FAIL`:
      return {
        ...state,
        error: errorMessage
      };
    case FILLER_LOGOUT:
      return initialState;

    case `${SAVE_ANSWER_URL}_SUBMIT`:
    case `${START_SURVEY_URL}_SUBMIT`:
    case `${OPT_IN_URL}_SUBMIT`:
      return {
        ...state,
        loading: true
      };
    case `${SAVE_ANSWER_URL}_SUCCEED`:
    case `${START_SURVEY_URL}_SUCCEED`:
    case `${OPT_IN_URL}_SUCCEED`:
      return {
        ...state,
        loading: false,
        error: undefined,
        survey
      };
    case `${SAVE_ANSWER_URL}_FAIL`:
    case `${START_SURVEY_URL}_FAIL`:
    case `${OPT_IN_URL}_FAIL`:
      return {
        ...state,
        loading: false,
        error: errorMessage
      };

    case RESET_SURVEY_DATA:
      return {
        ...state,
        survey: {}
      };

    default:
      return state;
  }
}

export default fillerReducer;
