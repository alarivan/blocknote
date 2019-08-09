import { EmptyAction } from "store/actions";
import { RawDraftContentState } from "draft-js";

export type Note = {
  id: string;
  body: RawDraftContentState;
  tags: string[];
};

export type NoteUpdate = {
  note: Note;
  values: {
    body?: RawDraftContentState;
    tags?: string[];
  };
};

export type TagNoteUpdate = {
  note: Note;
  tagId: string;
};

export type NotesState = {
  [key: string]: Note;
};

export const SET_NOTES = "SET_NOTES";
export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const ADD_TAG_TO_NOTE = "ADD_TAG_TO_NOTE";
export const DELETE_TAG_FROM_NOTE = "DELETE_TAG_FROM_NOTE";

export type SetNotesAction = {
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

export type DeleteNoteAction = {
  type: typeof DELETE_NOTE;
  payload: Note;
};

export type AddTagToNoteAction = {
  type: typeof ADD_TAG_TO_NOTE;
  payload: TagNoteUpdate;
};

export type DeleteTagFromNoteAction = {
  type: typeof DELETE_TAG_FROM_NOTE;
  payload: TagNoteUpdate;
};

export type NotesActionTypes =
  | SetNotesAction
  | AddNoteAction
  | UpdateNoteAction
  | DeleteNoteAction
  | AddTagToNoteAction
  | DeleteTagFromNoteAction
  | EmptyAction;
