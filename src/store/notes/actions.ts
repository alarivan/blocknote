import {
  NotesActionTypes,
  SET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  ADD_TAG_TO_NOTE,
  DELETE_TAG_FROM_NOTE,
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

export function addTagToNote(note: Note, tagId: string): NotesActionTypes {
  return { type: ADD_TAG_TO_NOTE, payload: { note, tagId } };
}

export function deleteTagFromNote(note: Note, tagId: string): NotesActionTypes {
  return { type: DELETE_TAG_FROM_NOTE, payload: { note, tagId } };
}
