import { takeLatest, put } from "redux-saga/effects";
import { requestApi } from "utils/requestApi";

import { FETCH_SYSTEM_DATA } from "./constants";

export function* fetchHomeDataWatcher() {
  yield takeLatest(`${FETCH_SYSTEM_DATA}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(FETCH_SYSTEM_DATA, { data }));
  });
}
