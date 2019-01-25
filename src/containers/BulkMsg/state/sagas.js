import { takeLatest, put } from "redux-saga/effects";
import { requestApi } from "utils/requestApi";

import { SEND_MSG_URL } from "./constants";

export function* sendBulkMsgWatcher() {
  yield takeLatest(`${SEND_MSG_URL}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(SEND_MSG_URL, { data }));
  });
}
