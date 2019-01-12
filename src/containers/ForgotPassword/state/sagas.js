import { takeLatest, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { requestApi } from "utils/requestApi";

import { REQUEST_URL, RESET_URL } from "./constants";

export function* requestPasswordWatcher() {
  yield takeLatest(`${REQUEST_URL}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(REQUEST_URL, { data }));
  });
}

export function* resetPasswordWatcher() {
  yield takeLatest(`${RESET_URL}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(RESET_URL, { data }));
  });
}

export function* resetSucceedWatcher() {
  yield takeLatest(`${RESET_URL}_SUCCEED`, function*() {
    yield put(push("/auth/login"));
  });
}
