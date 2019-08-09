import { EmptyAction } from "store/actions";

export type Tag = {
  id: string;
  name: string;
  color: string | string[];
  notes: string[];
};

export type TagUpdate = {
  tag: Tag;
  values: {
    name?: string;
    color?: string | string[];
    notes?: string[];
  };
};

export type TagsState = {
  [key: string]: Tag;
};

export const SET_TAGS = "SET_TAGS";
export const ADD_TAG = "ADD_TAG";
export const UPDATE_TAG = "UPDATE_TAG";
export const DELETE_TAG = "DELETE_TAG";

type SetTagsAction = {
  type: typeof SET_TAGS;
  payload: TagsState;
};

type AddTagAction = {
  type: typeof ADD_TAG;
  payload: Tag;
};

type UpdateTagAction = {
  type: typeof UPDATE_TAG;
  payload: TagUpdate;
};

type DeleteTagAction = {
  type: typeof DELETE_TAG;
  payload: Tag;
};

export type TagsActionTypes =
  | SetTagsAction
  | AddTagAction
  | UpdateTagAction
  | DeleteTagAction
  | EmptyAction;
