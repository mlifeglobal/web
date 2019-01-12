import { REQUEST_URL, RESET_URL } from "./constants";

export function requestPassword(data) {
  return {
    type: `${REQUEST_URL}_SUBMIT`,
    payload: data
  };
}

export function resetPassword(data) {
  return {
    type: `${RESET_URL}_SUBMIT`,
    payload: data
  };
}
