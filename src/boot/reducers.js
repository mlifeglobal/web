import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "containers/App/state/reducer";
import forgotPasswordReducer from "containers/ForgotPassword/state/reducer";
import homeReducer from "containers/Home/state/reducer";
import fillerReducer from "containers/Filler/state/reducer";
import bulkMsgReducer from "containers/BulkMsg/state/reducer";
import surveysReducer from "containers/Surveys/state/reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    home: homeReducer,
    filler: fillerReducer,
    bulkMsg: bulkMsgReducer,
    surveys: surveysReducer
  });
