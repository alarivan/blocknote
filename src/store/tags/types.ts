export interface Tag {
  id: string;
  name: string;
  color: string | string[];
}

export interface TagUpdate {
  tag: Tag;
  values: {
    name?: string;
    color?: string | string[];
  };
}

export interface TagsState {
  [key: string]: Tag;
}

export const SET_TAGS = "SET_TAGS";
export const ADD_TAG = "ADD_TAG";
export const UPDATE_TAG = "UPDATE_TAG";
export const DELETE_TAG = "DELETE_TAG";

interface SetTagsAction {
  type: typeof SET_TAGS;
  payload: TagsState;
}

interface AddTagAction {
  type: typeof ADD_TAG;
  payload: Tag;
}

interface UpdateTagAction {
  type: typeof UPDATE_TAG;
  payload: TagUpdate;
}

interface DeleteTagAction {
  type: typeof DELETE_TAG;
  payload: Tag;
}

export type TagsActionTypes =
  | SetTagsAction
  | AddTagAction
  | UpdateTagAction
  | DeleteTagAction;
