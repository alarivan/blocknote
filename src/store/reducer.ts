import { Reducer } from "redux";
import tagsReducer from "./tags/reducer";
import notesReducer from "./notes/reducer";
import { NotesActionTypes } from "store/notes/types";
import { TagsActionTypes } from "store/tags/types";
import { combineReducers } from "redux";

const _rootReducer = combineReducers({
  tagsState: tagsReducer,
  notesState: notesReducer
});

export type AppState = ReturnType<typeof _rootReducer>;

const rootReducer: Reducer<
  AppState,
  NotesActionTypes | TagsActionTypes
> = _rootReducer;

export default rootReducer;
