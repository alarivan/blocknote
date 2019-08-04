import { TagsState, TagsActionTypes, ADD_TAG, SET_TAGS } from "./types";

const initialState: TagsState = {
  tags: []
};

export default function tagsReducer(
  state = initialState,
  action: TagsActionTypes
): TagsState {
  switch (action.type) {
    case SET_TAGS:
      return {
        tags: [...action.payload]
      };
    case ADD_TAG:
      return {
        tags: [...state.tags, action.payload]
      };
    default:
      return state;
  }
}
