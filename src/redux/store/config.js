import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducer from "../reducers/index";

let middleware = compose(
  applyMiddleware(thunk, reduxImmutableStateInvariant()),
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

const configureStore = () => createStore(rootReducer, middleware);

export default configureStore;
