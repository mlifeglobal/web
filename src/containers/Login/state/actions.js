import { LOGIN_URL } from "./constants";

export function loginSubmit(data) {
  return {
    type: `${LOGIN_URL}_SUBMIT`,
    payload: data
  };
}
