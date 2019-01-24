import { FETCH_DATA_URL, SWITCH_TAB, TAB_NAMES } from "./constants";

export const initialState = {
  activeTab: TAB_NAMES.EXPORT,
  data: {}
};

function dataPointsReducer(state = initialState, action) {
  const {
    payload: { data = {} } = {},
    error: { value: errorMessage = "" } = {}
  } = action;

  switch (action.type) {
    case `${FETCH_DATA_URL}_SUBMIT`:
      return {
        ...initialState,
        loading: true
      };
    case `${FETCH_DATA_URL}_SUCCEED`:
      return {
        ...initialState,
        data
      };
    case `${FETCH_DATA_URL}_FAIL`:
      return {
        ...initialState,
        loginError: errorMessage
      };

    case SWITCH_TAB:
      return {
        ...state,
        activeTab: action.payload.tab
      };
    default:
      return state;
  }
}

export default dataPointsReducer;
