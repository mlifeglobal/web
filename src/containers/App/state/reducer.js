import { LOGIN_URL } from "containers/Login/state/constants";
// import { SIGNUP_URL } from "containers/SignUp/constants";
import { LOGOUT } from "./constants";

export const initialState = {
  data: {},
  loading: false,
  loginError: undefined,
  signupError: undefined
};

function authReducer(state = initialState, action) {
  const {
    payload: { data = {} } = {},
    error: { value: errorMessage = "" } = {}
  } = action;

  switch (action.type) {
    // Login cases
    case `${LOGIN_URL}_SUBMIT`:
      return {
        ...initialState,
        loading: true
      };
    case `${LOGIN_URL}_SUCCEED`:
      return {
        ...initialState,
        data
      };
    case `${LOGIN_URL}_FAIL`:
      return {
        ...initialState,
        loginError: errorMessage
      };

    // Signup cases
    /* case `${SIGNUP_URL}_SUBMIT`:
      return {
        ...initialState,
        loading: true
      };
    case `${SIGNUP_URL}_SUCCEED`:
      return {
        ...initialState,
        data
      };
    case `${SIGNUP_URL}_FAIL`:
      return {
        ...initialState,
        signUpError: errorMessage
      }; */
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}

export default authReducer;
