import { takeLatest, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { requestApi } from "utils/requestApi";

import { SIGNUP_URL } from "./constants";

export function* signUpSubmitWatcher() {
  yield takeLatest(`${SIGNUP_URL}_SUBMIT`, function*({ payload: data }) {
    yield put(requestApi(SIGNUP_URL, { data }));
  });
}

export function* signUpSucceedWatcher() {
  yield takeLatest(`${SIGNUP_URL}_SUCCEED`, function*() {
    yield put(push("/"));
  });
}
