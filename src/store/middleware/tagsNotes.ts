import { Dispatch, MiddlewareAPI, Action } from "redux";
import { Tag, ADD_TAG, DELETE_TAG } from "store/tags/types";
import { Note, ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "store/notes/types";
import { updateTag } from "store/tags/actions";
import { updateNote } from "store/notes/actions";

interface ActionWithPayloadInterface extends Action {
  payload: any;
}

type relationFactoryType = {
  type: string;
  model: any;
  fromState: string;
  toState: string;
  fromField: string;
  toField: string;
  updateAction: any;
};

const updateRelation = (
  state: any,
  dispatch: Dispatch,
  rel: relationFactoryType
) => {
  const from = state[rel.fromState][rel.model.id];
  from[rel.toField].forEach((id: string) => {
    const to = state[rel.toState][id];
    if (to && !to[rel.fromField].includes(rel.model.id)) {
      dispatch(
        rel.updateAction(to, {
          [rel.fromField]: to[rel.fromField].concat(from.id)
        })
      );
    }
  });
};
const clearRelation = (
  state: any,
  dispatch: Dispatch,
  rel: relationFactoryType
) => {
  rel.model[rel.toField].forEach((id: string) => {
    const to = state[rel.toState][id];
    if (to && to[rel.fromField].includes(rel.model.id)) {
      dispatch(
        rel.updateAction(to, {
          [rel.fromField]: to[rel.fromField].filter(
            (n: string) => n !== rel.model.id
          )
        })
      );
    }
  });
};

const relationFactory = (
  state: any,
  dispatch: Dispatch,
  type: string,
  model: any,
  action: any
) => {
  if (type === "note") {
    return action(state, dispatch, {
      type,
      model,
      fromState: "notesState",
      toState: "tagsState",
      fromField: "notes",
      toField: "tags",
      updateAction(model: Tag, values: any) {
        return updateTag({ tag: model, values });
      }
    });
  } else if (type === "tag") {
    return action(state, dispatch, {
      type,
      model,
      fromState: "tagsState",
      toState: "notesState",
      fromField: "tags",
      toField: "notes",
      updateAction(model: Note, values: any) {
        return updateNote({ note: model, values });
      }
    });
  }
};

export const tagNotesMiddleware = ({ dispatch, getState }: MiddlewareAPI) => (
  next: Dispatch
) => (action: ActionWithPayloadInterface) => {
  switch (action.type) {
    case ADD_NOTE:
      next(action);

      if (action.payload.tags) {
        relationFactory(
          getState(),
          dispatch,
          "note",
          action.payload,
          updateRelation
        );
      }
      break;
    case UPDATE_NOTE:
      next(action);

      if (action.payload.values.tags) {
        relationFactory(
          getState(),
          dispatch,
          "note",
          action.payload.note,
          updateRelation
        );
      }
      break;
    case DELETE_NOTE:
      relationFactory(
        getState(),
        dispatch,
        "note",
        action.payload,
        clearRelation
      );

      next(action);
      break;
    case ADD_TAG:
      next(action);

      relationFactory(
        getState(),
        dispatch,
        "tag",
        action.payload,
        updateRelation
      );
      break;
    case DELETE_TAG:
      relationFactory(
        getState(),
        dispatch,
        "tag",
        action.payload,
        clearRelation
      );

      next(action);
      break;
    default:
      return next(action);
  }
};

export default tagNotesMiddleware;
