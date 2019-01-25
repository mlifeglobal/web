import { SEND_MSG_URL } from "./constants";

export function sendBulkMsg(payload) {
  return {
    payload,
    type: `${SEND_MSG_URL}_SUBMIT`
  };
}
