import { Dispatch, MiddlewareAPI, Action } from "redux";
import { ADD_TAG, DELETE_TAG } from "store/tags/types";
import {
  ADD_NOTE,
  DELETE_NOTE,
  ADD_TAG_TO_NOTE,
  DELETE_TAG_FROM_NOTE
} from "store/notes/types";
import { updateTag } from "store/tags/actions";
import { updateNote } from "store/notes/actions";
import { AppState } from "store/reducer";

interface ActionWithPayloadInterface extends Action {
  payload: any;
}

const fieldUpdaterAdd = (model: any, field: string, id: string) => {
  if (model && !model[field].includes(id)) {
    return {
      [field]: model[field].concat(id)
    };
  }

  return null;
};
const fieldUpdaterDelete = (model: any, field: string, id: string) => {
  if (model && model[field].includes(id)) {
    return {
      [field]: model[field].filter((f: string) => f !== id)
    };
  }

  return null;
};

const updateNoteIds = (
  state: AppState,
  dispatch: Dispatch,
  action: ActionWithPayloadInterface,
  fieldUpdater: (model: any, field: string, id: string) => any
) => {
  const note = state.notesState[action.payload.id];
  note.tags.forEach(tagId => {
    const tag = state.tagsState[tagId];

    const update = fieldUpdater(tag, "notes", note.id);

    if (update) dispatch(updateTag({ tag, values: update }));
  });
};

const updateTagIds = (
  state: AppState,
  dispatch: Dispatch,
  action: ActionWithPayloadInterface,
  fieldUpdater: (model: any, field: string, id: string) => any
) => {
  const tag = state.tagsState[action.payload.id];
  tag.notes.forEach(noteId => {
    const note = state.notesState[noteId];

    const update = fieldUpdater(note, "tags", tag.id);

    if (update) dispatch(updateNote({ note, values: update }));
  });
};

const updateNoteId = (
  state: AppState,
  dispatch: Dispatch,
  action: ActionWithPayloadInterface,
  fieldUpdater: (model: any, field: string, id: string) => any
) => {
  const tag = state.tagsState[action.payload.tagId];

  const update = fieldUpdater(tag, "notes", action.payload.note.id);

  if (update) dispatch(updateTag({ tag, values: update }));
};

export const tagNotesMiddleware = ({ dispatch, getState }: MiddlewareAPI) => (
  next: Dispatch
) => (action: ActionWithPayloadInterface) => {
  switch (action.type) {
    case ADD_NOTE:
      next(action);

      if (action.payload.tags) {
        updateNoteIds(getState(), dispatch, action, fieldUpdaterAdd);
      }
      break;
    case ADD_TAG_TO_NOTE:
      next(action);

      updateNoteId(getState(), dispatch, action, fieldUpdaterAdd);
      break;
    case DELETE_TAG_FROM_NOTE:
      next(action);

      updateNoteId(getState(), dispatch, action, fieldUpdaterDelete);
      break;
    case DELETE_NOTE:
      updateNoteIds(getState(), dispatch, action, fieldUpdaterDelete);

      next(action);
      break;
    case ADD_TAG:
      next(action);

      updateTagIds(getState(), dispatch, action, fieldUpdaterAdd);
      break;
    case DELETE_TAG:
      updateTagIds(getState(), dispatch, action, fieldUpdaterDelete);

      next(action);
      break;
    default:
      return next(action);
  }
};

export default tagNotesMiddleware;
