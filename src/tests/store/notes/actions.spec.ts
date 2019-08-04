import * as actions from "store/notes/actions";
import * as types from "store/notes/types";
import NoteModel from "models/note";

const note = NoteModel("note body", ["tag1", "tag2"]);
describe("notes/actions", () => {
  it("should create an action to set notes", () => {
    const payload = Object.assign({}, { [note.id]: note });
    const expectedAction = {
      type: types.SET_NOTES,
      payload
    };

    const expectedActionEmpty = Object.assign({}, expectedAction, {
      payload: {}
    });

    expect(actions.setNotes(payload)).toEqual(expectedAction);

    expect(actions.setNotes({})).toEqual(expectedActionEmpty);
  });

  it("should create an action to add note", () => {
    const payload = note;
    const expectedAction = {
      type: types.ADD_NOTE,
      payload
    };

    expect(actions.addNote(payload)).toEqual(expectedAction);
  });

  it("should create an action to update note", () => {
    const payload = {
      note,
      values: { body: "note body updated" }
    };
    const expectedAction = {
      type: types.UPDATE_NOTE,
      payload
    };

    expect(actions.updateNote(payload)).toEqual(expectedAction);
  });

  it("should create an action to delete note", () => {
    const payload = note;
    const expectedAction = {
      type: types.DELETE_NOTE,
      payload
    };

    expect(actions.deleteNote(payload)).toEqual(expectedAction);
  });
});
