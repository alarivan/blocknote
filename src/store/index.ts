import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
import tagNotes from "store/middleware/tagsNotes";

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, tagNotes))
);

export default store;
