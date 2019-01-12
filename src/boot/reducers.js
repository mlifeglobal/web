import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "containers/App/state/reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer
  });
