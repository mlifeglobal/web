import { SURVEYS_URL, SURVEY_CREATE } from "./constants";

export const initialState = {};

function surveysReducer(state = initialState, action) {
  switch (action.type) {
    case `${SURVEYS_URL}_SUBMIT`:
      return { ...state, loading: true };
    case `${SURVEYS_URL}_SUCCEED`:
      return {
        ...state,
        loading: false,
        data: action.payload.surveys || [],
        surveysCount: action.payload.surveysCount
      };
    case `${SURVEY_CREATE}_SUCCEED`:
      return { ...state, loading: false, data: action.payload.surveys || [] };
    case `${SURVEYS_URL}_FAIL`:
      return { ...state, loading: false, data: [] };
    default:
      return state;
  }
}

export default surveysReducer;
