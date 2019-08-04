import {
  TagsState,
  TagsActionTypes,
  SET_TAGS,
  ADD_TAG,
  UPDATE_TAG,
  DELETE_TAG
} from "./types";

const initialState: TagsState = {};

export default function tagsReducer(
  state = initialState,
  action: TagsActionTypes
): TagsState {
  switch (action.type) {
    case SET_TAGS:
      return Object.assign({}, action.payload);

    case ADD_TAG:
      return Object.assign({}, state, { [action.payload.id]: action.payload });

    case UPDATE_TAG:
      return Object.assign({}, state, {
        [action.payload.tag.id]: Object.assign(
          {},
          action.payload.tag,
          action.payload.values
        )
      });

    case DELETE_TAG:
      const { [action.payload.id]: deleted, ...newState } = state;
      return newState;

    default:
      return state;
  }
}
