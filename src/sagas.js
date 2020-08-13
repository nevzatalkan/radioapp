import { call, put, takeEvery, fork, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import _ from "lodash";
import Api from "./api/index";
const { Record, List, fromJS } = require("immutable");



function* callApi(action) {
  const data = yield Api.getAll(action.customerId, action.resourceName).then(result => {
    return result;
  });

  if (data !== null) {
    yield put({
      type: "process",
      propertyNames: action.propertyNames,
      payload: fromJS(data)
    });
  }
}


export const callApiSaga = function*() {
  yield takeEvery("callApi", callApi);
};

export const sagaRoot = function*() {
  yield [    
    fork(callApiSaga),
  ];
};

export default sagaRoot;
