import {
  NotesState,
  NotesActionTypes,
  SET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  ADD_TAG_TO_NOTE,
  DELETE_TAG_FROM_NOTE
} from "./types";

const initialState: NotesState = {};

export default function notesReducer(
  state = initialState,
  action: NotesActionTypes
): NotesState {
  switch (action.type) {
    case SET_NOTES:
      return Object.assign({}, action.payload);

    case ADD_NOTE:
      return Object.assign({}, state, { [action.payload.id]: action.payload });

    case UPDATE_NOTE:
      return Object.assign({}, state, {
        [action.payload.note.id]: Object.assign(
          {},
          action.payload.note,
          action.payload.values
        )
      });

    case DELETE_NOTE:
      const { [action.payload.id]: deleted, ...newState } = state;
      return newState;

    case ADD_TAG_TO_NOTE:
      return Object.assign({}, state, {
        [action.payload.note.id]: Object.assign({}, action.payload.note, {
          tags: action.payload.note.tags.concat(action.payload.tagId)
        })
      });

    case DELETE_TAG_FROM_NOTE:
      return Object.assign({}, state, {
        [action.payload.note.id]: Object.assign({}, action.payload.note, {
          tags: action.payload.note.tags.filter(t => t !== action.payload.tagId)
        })
      });

    default:
      return state;
  }
}
