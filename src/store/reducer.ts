import tagsReducer from "./tags/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  tagsState: tagsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
