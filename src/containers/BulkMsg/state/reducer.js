import { SEND_MSG_URL } from "./constants";

export const initialState = {
  data: {},
  loading: false,
  error: undefined
};

function bulkMsgReducer(state = initialState, action) {
  const {
    payload: { data = {} } = {},
    error: { value: errorMessage = "" } = {}
  } = action;

  switch (action.type) {
    case `${SEND_MSG_URL}_SUBMIT`:
      return {
        ...initialState,
        loading: true
      };
    case `${SEND_MSG_URL}_SUCCEED`:
      return {
        ...initialState,
        data
      };
    case `${SEND_MSG_URL}_FAIL`:
      return {
        ...initialState,
        error: errorMessage
      };

    default:
      return state;
  }
}

export default bulkMsgReducer;
