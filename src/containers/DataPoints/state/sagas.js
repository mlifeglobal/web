import { takeLatest, put } from "redux-saga/effects";
import { requestApi } from "utils/requestApi";

import { FETCH_DATA_URL } from "./constants";

export function* fetchDataWatcher() {
  yield takeLatest(`${FETCH_DATA_URL}_SUBMIT`, function*() {
    yield put(requestApi(FETCH_DATA_URL));
  });
}
