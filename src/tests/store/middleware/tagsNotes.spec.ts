import {
  addNote,
  updateNote,
  addTagToNote,
  deleteTagFromNote,
  deleteNote
} from "store/notes/actions";
import {
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NotesState,
  ADD_TAG_TO_NOTE,
  DELETE_TAG_FROM_NOTE
} from "store/notes/types";
import { ADD_TAG, DELETE_TAG, UPDATE_TAG, TagsState } from "store/tags/types";
import { addTag, deleteTag } from "store/tags/actions";
import tagsNotes from "store/middleware/tagsNotes";
import NoteModel from "models/note";
import TagModel from "models/tag";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore([tagsNotes]);

const createStore = (
  modelNote: boolean = true,
  modelTag: boolean = true,
  storeNote: boolean = true,
  storeTag: boolean = true
) => {
  const note = NoteModel("tag1");
  const tag = TagModel("note1");

  const notesState: NotesState = {};
  const tagsState: TagsState = {};

  // adds tag to note
  if (modelNote) note.tags = [tag.id];
  // adds note to tag
  if (modelTag) tag.notes = [note.id];

  // adds note to store
  if (storeNote) notesState[note.id] = note;
  // adds tag to store
  if (storeTag) tagsState[tag.id] = tag;

  const initialState = mockStore({
    notesState,
    tagsState
  });

  return {
    store: initialState,
    note,
    tag
  };
};

describe("tagsNotes", () => {
  describe("Note", () => {
    it("should dispatch UPDATE_TAG on ADD_NOTE when Tag doesn't have note id", () => {
      const { store, note, tag } = createStore(true, false);

      store.dispatch(addNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(ADD_NOTE);
      expect(actions[1].type).toEqual(UPDATE_TAG);
    });

    it("shouldn't dispatch UPDATE_TAG on ADD_NOTE when Tag has note id", () => {
      const { store, note } = createStore();

      store.dispatch(addNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(ADD_NOTE);
    });

    it("should dispatch UPDATE_TAG on ADD_TAG_TO_NOTE when Tag doesn't have note id", () => {
      const { store, note, tag } = createStore(true, false);

      store.dispatch(addTagToNote(note, tag.id));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(ADD_TAG_TO_NOTE);
      expect(actions[1].type).toEqual(UPDATE_TAG);
    });

    it("shouldn't dispatch UPDATE_TAG on ADD_TAG_TO_NOTE when Tag has note id", () => {
      const { store, note, tag } = createStore();

      store.dispatch(addTagToNote(note, tag.id));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(ADD_TAG_TO_NOTE);
    });

    it("shouldn't dispatch UPDATE_TAG on ADD_TAG_TO_NOTE when Tag doesn't exist", () => {
      const { store, note, tag } = createStore(true, true, true, false);

      store.dispatch(addTagToNote(note, tag.id));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(ADD_TAG_TO_NOTE);
    });

    it("should dispatch UPDATE_TAG on DELETE_NOTE when Note has tags", () => {
      const { store, note } = createStore();

      store.dispatch(deleteNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(UPDATE_TAG);
      expect(actions[1].type).toEqual(DELETE_NOTE);
    });

    it("shouldn't dispatch UPDATE_TAG on DELETE_NOTE when Note doesn't have tags", () => {
      const { store, note } = createStore(false);

      store.dispatch(deleteNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_NOTE);
    });

    it("shouldn't dispatch UPDATE_TAG on DELETE_NOTE for Tags that don't exist", () => {
      const { store, note } = createStore(false, true, true, false);

      store.dispatch(deleteNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_NOTE);
    });

    it("should dispatch UPDATE_TAG on DELETE_TAG_FROM_NOTE when Tag has note id", () => {
      const { store, note, tag } = createStore();

      store.dispatch(deleteTagFromNote(note, tag.id));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(DELETE_TAG_FROM_NOTE);
      expect(actions[1].type).toEqual(UPDATE_TAG);
    });

    it("shouldn't dispatch UPDATE_TAG on DELETE_TAG_FROM_NOTE when Tag doesn't have note id", () => {
      const { store, note, tag } = createStore(true, false);

      store.dispatch(deleteTagFromNote(note, tag.id));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_TAG_FROM_NOTE);
    });

    it("shouldn't dispatch UPDATE_TAG on DELETE_TAG_FROM_NOTE when Tag doesn't exist", () => {
      const { store, note, tag } = createStore(true, true, true, false);

      store.dispatch(deleteTagFromNote(note, tag.id));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_TAG_FROM_NOTE);
    });
  });

  describe("Tag", () => {
    it("should dispatch UPDATE_NOTE on ADD_TAG when Note doesn't have tag id", () => {
      const { store, tag } = createStore(false);

      store.dispatch(addTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(ADD_TAG);
      expect(actions[1].type).toEqual(UPDATE_NOTE);
    });

    it("shouldn't dispatch UPDATE_NOTE on ADD_TAG when Note has tag id", () => {
      const { store, tag } = createStore();

      store.dispatch(addTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(ADD_TAG);
    });

    it("shouldn't dispatch UPDATE_NOTE on ADD_TAG when Note doesn't exist", () => {
      const { store, tag } = createStore(true, true, false, true);

      store.dispatch(addTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(ADD_TAG);
    });

    it("should dispatch UPDATE_NOTE on DELETE_TAG when Note has tag id", () => {
      const { store, tag } = createStore();

      store.dispatch(deleteTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(UPDATE_NOTE);
      expect(actions[1].type).toEqual(DELETE_TAG);
    });

    it("shouldn't dispatch UPDATE_NOTE on DELETE_TAG when Note doesn't have tag id", () => {
      const { store, tag } = createStore(false);

      store.dispatch(deleteTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_TAG);
    });

    it("shouldn't dispatch UPDATE_NOTE on DELETE_TAG when Note doesn't exist", () => {
      const { store, tag } = createStore(true, true, false, true);

      store.dispatch(deleteTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_TAG);
    });
  });
});
