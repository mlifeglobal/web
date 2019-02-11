import axios from "axios";
import { put, takeEvery, select, call } from "redux-saga/effects";

const API_REQUEST = "API_REQUEST";
const API_ROOT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://api.mlifeglobal.com";

const client = axios.create({ baseURL: API_ROOT });

const request = async (method = "post", url, params, config, file = false) => {
  try {
    if (file) {
      const { data } = await axios({
        method: "post",
        url: `${API_ROOT}/${url}`,
        data: params,
        config
      });
      return { payload: data };
    } else {
      const { data } = await client[method](url, params, config);

      return { payload: data };
    }
  } catch (error) {
    if (error.response) {
      const {
        response: {
          status,
          data: { errors }
        }
      } = error;

      return { error: { errors, status } };
    }

    return { error };
  }
};

export const requestApi = (
  url,
  params = {},
  meta = {},
  method,
  config,
  file = false
) => ({
  meta,
  payload: { config, method, params, url, file },
  type: API_REQUEST
});

/* eslint-disable */
export default function* requestApiWatcher() {
  yield takeEvery(API_REQUEST, function*({
    meta,
    payload: { config = {}, method, params, url, file }
  }) {
    const { headers = {} } = config;

    const { jwt } = yield select(state => {
      const substate = meta.filler ? state.filler : state.auth;
      return substate ? substate.data : {};
    });

    if (jwt) {
      config.headers = { ...headers, authorization: `Bearer ${jwt}` };
    }

    const { payload, error } = yield call(
      request,
      method,
      url,
      params,
      config,
      file
    );

    let errorContent = {};
    if (error) {
      const { errors, status } = error;
      if (errors && errors.constructor === Array && errors.length) {
        errorContent.key = errors[0].key;
        errorContent.value = errors[0].value;
        if (status) {
          errorContent.status = status;
        }
      } else {
        errorContent = error;
      }
    }

    const type = `${url}_${payload ? "SUCCEED" : "FAIL"}`;
    yield put({ error: errorContent, meta, payload, type });
  });
}
