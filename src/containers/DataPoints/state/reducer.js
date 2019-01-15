import { SWITCH_TAB, TAB_NAMES } from "./constants";

export const initialState = {
  activeTab: TAB_NAMES.EXPORT,
  queryObj: {}
};

function dataPointsReducer(state = initialState, action) {
  switch (action.type) {
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
