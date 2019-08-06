import { addNote, updateNote, deleteNote } from "store/notes/actions";
import {
  Note,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NotesState
} from "store/notes/types";
import { Tag, ADD_TAG, DELETE_TAG, TagsState } from "store/tags/types";
import { addTag, deleteTag } from "store/tags/actions";
import tagsNotes from "store/middleware/tagsNotes";
import NoteModel from "models/note";
import TagModel from "models/tag";
import configureMockStore from "redux-mock-store";
import { UPDATE_TAG } from "store/tags/types";

const mockStore = configureMockStore([tagsNotes]);

type ApplyTo = {
  tag: boolean;
  note: boolean;
};

const createStore = (
  model: ApplyTo = { tag: false, note: true },
  store: ApplyTo = { tag: true, note: true }
) => {
  const note = NoteModel("tag1");
  const tag = TagModel("note1");

  const notesState: NotesState = {};
  const tagsState: TagsState = {};

  if (model.note) note.tags = [tag.id];
  if (model.tag) tag.notes = [note.id];

  if (store.note) notesState[note.id] = note;
  if (store.tag) tagsState[tag.id] = tag;

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
      const { store, note } = createStore();

      store.dispatch(addNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(ADD_NOTE);
      expect(actions[1].type).toEqual(UPDATE_TAG);
    });

    it("should dispatch UPDATE_TAG on UPDATE_NOTE when Tag doesn't have note id", () => {
      const { store, note, tag } = createStore();

      store.dispatch(updateNote({ note, values: { tags: [tag.id] } }));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(UPDATE_NOTE);
      expect(actions[1].type).toEqual(UPDATE_TAG);
    });

    it("shouldn't dispatch UPDATE_TAG on ADD_NOTE when Tag has note id", () => {
      const { store, note } = createStore({ tag: true, note: true });

      store.dispatch(addNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(ADD_NOTE);
    });

    it("shouldn't dispatch UPDATE_TAG on UPDATE_NOTE when Tag has note id", () => {
      const { store, note, tag } = createStore({ tag: true, note: true });

      store.dispatch(updateNote({ note, values: { tags: [tag.id] } }));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(UPDATE_NOTE);
    });

    it("shouldn't dispatch UPDATE_TAG on UPDATE_NOTE when Tag doesn't exist", () => {
      const { store, note, tag } = createStore(
        { tag: true, note: true },
        { tag: false, note: true }
      );

      store.dispatch(updateNote({ note, values: { tags: [tag.id] } }));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(UPDATE_NOTE);
    });

    it("should dispatch UPDATE_TAG on DELETE_NOTE when Note has tags", () => {
      const { store, note } = createStore({ tag: true, note: true });

      store.dispatch(deleteNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(UPDATE_TAG);
      expect(actions[1].type).toEqual(DELETE_NOTE);
    });

    it("shouldn't dispatch UPDATE_TAG on DELETE_NOTE when Note doesn't have tags", () => {
      const { store, note } = createStore({ tag: true, note: false });

      store.dispatch(deleteNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_NOTE);
    });

    it("shouldn't dispatch UPDATE_TAG on DELETE_NOTE for Tags that don't exist", () => {
      const { store, note } = createStore(
        { tag: true, note: false },
        { tag: false, note: true }
      );

      store.dispatch(deleteNote(note));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_NOTE);
    });
  });

  describe("Tag", () => {
    it("should dispatch UPDATE_NOTE on ADD_TAG when Note doesn't have tag id", () => {
      const { store, tag } = createStore({ tag: true, note: false });

      store.dispatch(addTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(ADD_TAG);
      expect(actions[1].type).toEqual(UPDATE_NOTE);
    });

    it("shouldn't dispatch UPDATE_NOTE on ADD_TAG when Note has tag id", () => {
      const { store, tag } = createStore({ tag: true, note: true });

      store.dispatch(addTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(ADD_TAG);
    });

    it("shouldn't dispatch UPDATE_NOTE on ADD_TAG when Note doesn't exist", () => {
      const { store, tag } = createStore(
        { tag: true, note: true },
        { tag: true, note: false }
      );

      store.dispatch(addTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(ADD_TAG);
    });

    it("should dispatch UPDATE_NOTE on DELETE_TAG when Note has tag id", () => {
      const { store, tag } = createStore({ tag: true, note: true });

      store.dispatch(deleteTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(2);
      expect(actions[0].type).toEqual(UPDATE_NOTE);
      expect(actions[1].type).toEqual(DELETE_TAG);
    });

    it("shouldn't dispatch UPDATE_NOTE on DELETE_TAG when Note doesn't have tag id", () => {
      const { store, tag } = createStore({ tag: true, note: false });

      store.dispatch(deleteTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_TAG);
    });

    it("shouldn't dispatch UPDATE_NOTE on DELETE_TAG when Note doesn't exist", () => {
      const { store, tag } = createStore(
        { tag: true, note: true },
        { tag: true, note: false }
      );

      store.dispatch(deleteTag(tag));

      const actions = store.getActions();

      expect(actions.length).toBe(1);
      expect(actions[0].type).toEqual(DELETE_TAG);
    });
  });
});
