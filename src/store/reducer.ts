import tagsReducer from "./tags/reducer";
import notesReducer from "./notes/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  tagsState: tagsReducer,
  notesState: notesReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
