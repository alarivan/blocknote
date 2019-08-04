export interface Note {
  id: string;
  body: string;
  tags: string[];
}

export interface NoteUpdate {
  note: Note;
  values: {
    body?: string;
    tags?: string[];
  };
}

export interface NotesState {
  [key: string]: Note;
}

export const SET_NOTES = "SET_NOTES";
export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

interface SetNotesAction {
  type: typeof SET_NOTES;
  payload: NotesState;
}

interface AddNoteAction {
  type: typeof ADD_NOTE;
  payload: Note;
}

interface UpdateNoteAction {
  type: typeof UPDATE_NOTE;
  payload: NoteUpdate;
}

interface DeleteNoteAction {
  type: typeof DELETE_NOTE;
  payload: Note;
}

export type NotesActionTypes =
  | SetNotesAction
  | AddNoteAction
  | UpdateNoteAction
  | DeleteNoteAction;
