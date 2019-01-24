import { SWITCH_TAB, FETCH_DATA_URL } from "./constants";

export function switchTab(payload) {
  return {
    payload,
    type: SWITCH_TAB
  };
}

export function fetchData() {
  return {
    type: `${FETCH_DATA_URL}_SUBMIT`
  };
}
