import { SWITCH_TAB } from "./constants";

export function switchTab(payload) {
  return {
    payload,
    type: SWITCH_TAB
  };
}
