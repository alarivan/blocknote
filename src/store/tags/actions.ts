import {
  TagsActionTypes,
  SET_TAGS,
  ADD_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  Tag,
  TagsState,
  TagUpdate
} from "./types";

export function setTags(payload: TagsState): TagsActionTypes {
  return { type: SET_TAGS, payload };
}

export function addTag(payload: Tag): TagsActionTypes {
  return { type: ADD_TAG, payload };
}

export function updateTag(payload: TagUpdate): TagsActionTypes {
  return { type: UPDATE_TAG, payload };
}

export function deleteTag(payload: Tag): TagsActionTypes {
  return { type: DELETE_TAG, payload };
}
