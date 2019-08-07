import { setNotes, addNote, updateNote, deleteNote } from "store/notes/actions";
import { Note } from "store/notes/types";
import reducer from "store/notes/reducer";
import NoteModel from "models/note";
import { emptyAction } from "store/actions";

const notes = ["note1", "note2"].reduce((acc, n) => {
  const note = NoteModel(n);
  return Object.assign(acc, { [note.id]: note });
}, {});

const note = NoteModel("note3");
const fakeNote = NoteModel("fake");
describe("notes reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, emptyAction())).toEqual({});
  });

  it("should handle SET_NOTES", () => {
    expect(reducer({}, setNotes(notes))).toEqual(notes);

    expect(
      reducer(
        {
          [note.id]: note
        },
        setNotes(notes)
      )
    ).toEqual(notes);
  });

  it("should handle ADD_NOTE", () => {
    expect(reducer({}, addNote(note))).toEqual({ [note.id]: note });
    expect(reducer(notes, addNote(note))).toEqual(
      Object.assign(notes, { [note.id]: note })
    );
  });

  describe("should handle UPDATE_NOTE", () => {
    const body = "updated body";
    const noteUpdate = {
      note,
      values: { body }
    };
    const updatedNote: Note = Object.assign({}, note, { body });
    const updateNoteState = {
      [updatedNote.id]: updatedNote
    };
    const initialState = reducer(notes, addNote(note));

    afterEach(() => {
      expect(note.body).toBe("note3");
      expect(initialState[note.id].body).toBe("note3");
    });

    it("when state is empty", () => {
      expect(reducer({}, updateNote(noteUpdate))).toEqual(updateNoteState);
    });

    it("when note is present", () => {
      const updatedState = reducer(initialState, updateNote(noteUpdate));
      expect(updatedState).toEqual(
        Object.assign({}, initialState, updateNoteState)
      );
      expect(updatedState[updatedNote.id].body).toEqual(body);
    });

    it("when note is missing", () => {
      const noteUpdateFake = {
        note: fakeNote,
        values: { body }
      };
      const updatedNoteFake: Note = Object.assign({}, fakeNote, { body });
      expect(reducer(initialState, updateNote(noteUpdateFake))).toEqual(
        Object.assign({}, initialState, {
          [fakeNote.id]: updatedNoteFake
        })
      );
    });
  });

  it("should handle DELETE_NOTE", () => {
    const noteState = {
      [note.id]: note
    };

    expect(reducer(noteState, deleteNote(note))).toEqual({});
    expect(reducer(noteState, deleteNote(fakeNote))).toEqual(noteState);
  });
});
