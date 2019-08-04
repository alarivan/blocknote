import {
  NotesActionTypes,
  SET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  Note,
  NotesState,
  NoteUpdate
} from "./types";

export function setNotes(payload: NotesState): NotesActionTypes {
  return { type: SET_NOTES, payload };
}

export function addNote(payload: Note): NotesActionTypes {
  return { type: ADD_NOTE, payload };
}

export function updateNote(payload: NoteUpdate): NotesActionTypes {
  return { type: UPDATE_NOTE, payload };
}

export function deleteNote(payload: Note): NotesActionTypes {
  return { type: DELETE_NOTE, payload };
}
