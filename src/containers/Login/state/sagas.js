import { takeLatest, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { requestApi } from "utils/requestApi";

import { LOGIN_URL } from "./constants";

export function* loginSubmitWatcher() {
  yield takeLatest(`${LOGIN_URL}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(LOGIN_URL, { data }));
  });
}

export function* loginSucceedWatcher() {
  yield takeLatest(`${LOGIN_URL}_SUCCEED`, function*() {
    yield put(push("/"));
  });
}
