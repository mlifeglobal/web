import { REQUEST_URL, RESET_URL } from "./constants";

export const initialState = {
  step: 0,
  requestStatus: "uninitiated",
  resetStatus: "uninitiated",
  requestError: undefined,
  resetError: undefined
};

function forgotPasswordReducer(state = initialState, action) {
  const { error: { value: errorMessage = "" } = {} } = action;

  switch (action.type) {
    // Request cases
    case `${REQUEST_URL}_SUBMIT`:
      return {
        ...state,
        requestStatus: "loading"
      };
    case `${REQUEST_URL}_SUCCEED`:
      return {
        ...state,
        requestStatus: "succeeded",
        step: 1,
        requestError: undefined
      };
    case `${REQUEST_URL}_FAIL`:
      return {
        ...state,
        requestStatus: "failed",
        requestError: errorMessage
      };

    // Reset cases
    case `${RESET_URL}_SUBMIT`:
      return {
        ...state,
        resetStatus: "loading"
      };
    case `${RESET_URL}_SUCCEED`:
      return initialState;
    case `${RESET_URL}_FAIL`:
      return {
        ...state,
        resetStatus: "failed",
        resetError: errorMessage
      };

    default:
      return state;
  }
}

export default forgotPasswordReducer;
