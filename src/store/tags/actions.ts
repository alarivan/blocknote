import { TagsActionTypes, SET_TAGS, ADD_TAG, Tag } from "./types";

export function setTags(payload: Tag[]): TagsActionTypes {
  return { type: SET_TAGS, payload };
}

export function addTag(payload: Tag): TagsActionTypes {
  return { type: ADD_TAG, payload };
}
