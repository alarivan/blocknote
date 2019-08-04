export interface Tag {
  id: string;
  name: string;
  color: string | string[];
}

export interface TagsState {
  tags: Tag[];
}

export const SET_TAGS = "SET_TAGS";
export const ADD_TAG = "ADD_TAG";

interface SetTagsAction {
  type: typeof SET_TAGS;
  payload: Tag[];
}

interface AddTagAction {
  type: typeof ADD_TAG;
  payload: Tag;
}

export type TagsActionTypes = SetTagsAction | AddTagAction;
