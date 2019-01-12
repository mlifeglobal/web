import { SIGNUP_URL } from "./constants";

export function signUpSubmit(data) {
  return {
    type: `${SIGNUP_URL}_SUBMIT`,
    payload: data
  };
}
