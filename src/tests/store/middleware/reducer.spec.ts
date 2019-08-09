import { addNote, updateNote, deleteNote } from "store/notes/actions";
import {
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NotesState
} from "store/notes/types";
import { ADD_TAG, DELETE_TAG, UPDATE_TAG, TagsState } from "store/tags/types";
import { addTag, deleteTag } from "store/tags/actions";
import tagsNotes from "store/middleware/tagsNotes";
import NoteModel from "models/note";
import TagModel from "models/tag";
import configureMockStore from "redux-mock-store";
import rootReducer from "store/reducer";
import { emptyAction } from "store/actions";

describe("notes reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, emptyAction())).toEqual({
      notesState: {},
      tagsState: {}
    });
  });
});
