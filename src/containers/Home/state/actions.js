import { FETCH_SYSTEM_DATA } from "./constants";

export function fetchSystemData() {
  return {
    type: `${FETCH_SYSTEM_DATA}_SUBMIT`
  };
}
