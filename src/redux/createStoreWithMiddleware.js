import sagaRoot from "../sagas";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./models/index";

export default function createStoreWithMiddleware(sagaMiddleware) {
  const _createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(...[sagaMiddleware])
  )(createStore);

  return _createStoreWithMiddleware(reducer);
}

export function prepareStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStoreWithMiddleware(sagaMiddleware);

  sagaMiddleware.run(sagaRoot);
  return store;
}
