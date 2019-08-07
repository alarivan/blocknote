import { EmptyAction } from "store/actions";

export type Note = {
  id: string;
  body: string;
  tags: string[];
};

export type NoteUpdate = {
  note: Note;
  values: {
    body?: string;
    tags?: string[];
  };
};

export type NotesState = {
  [key: string]: Note;
};

export const SET_NOTES = "SET_NOTES";
export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

type SetNotesAction = {
  type: typeof SET_NOTES;
  payload: NotesState;
};

export type AddNoteAction = {
  type: typeof ADD_NOTE;
  payload: Note;
};

export type UpdateNoteAction = {
  type: typeof UPDATE_NOTE;
  payload: NoteUpdate;
};

type DeleteNoteAction = {
  type: typeof DELETE_NOTE;
  payload: Note;
};

export type NotesActionTypes =
  | SetNotesAction
  | AddNoteAction
  | UpdateNoteAction
  | DeleteNoteAction
  | EmptyAction;
