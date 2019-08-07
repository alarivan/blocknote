import { Reducer } from "redux";
import tagsReducer from "./tags/reducer";
import notesReducer from "./notes/reducer";
import { NotesActionTypes } from "store/notes/types";
import { TagsActionTypes } from "store/tags/types";
import { EmptyAction } from "store/actions";
import { combineReducers } from "redux";

const _rootReducer = combineReducers({
  tagsState: tagsReducer,
  notesState: notesReducer
});

export type AppState = ReturnType<typeof _rootReducer>;

const rootReducer: Reducer<
  AppState,
  NotesActionTypes | TagsActionTypes | EmptyAction
> = _rootReducer;

export default rootReducer;
