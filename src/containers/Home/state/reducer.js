import { FETCH_SYSTEM_DATA } from "./constants";

export const initialState = {
  data: {
    surveys: 0,
    participants: 0,
    dataPoints: 0,
    messages: 0
  },
  loading: false,
  error: undefined
};

function homeReducer(state = initialState, action) {
  const {
    payload: { data = {} } = {},
    error: { value: errorMessage = "" } = {}
  } = action;

  switch (action.type) {
    case `${FETCH_SYSTEM_DATA}_SUBMIT`:
      return {
        ...state,
        loading: true,
        error: undefined
      };
    case `${FETCH_SYSTEM_DATA}_SUCCEED`:
      return {
        ...state,
        data,
        loading: false,
        error: undefined
      };
    case `${FETCH_SYSTEM_DATA}_FAIL`:
      return {
        ...state,
        loading: false,
        error: errorMessage
      };
    default:
      return state;
  }
}

export default homeReducer;
