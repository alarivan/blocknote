import React from "react";
import { Link } from "react-router-dom";

import { Note } from "store/notes/types";

import SimpleView from "./SimpleView";

type ListProps = {
  notes: Note[];
  onDeleteClick(note: Note): void;
  onEditClick(note: Note): void;
};

export const List = (props: ListProps) => {
  return (
    <ul data-cy="note-list">
      {props.notes.map((el: Note) => (
        <li data-cy="note-item" key={el.id}>
          <SimpleView note={el} onClick={() => {}} />
          <button
            data-cy="note-item-delete"
            onClick={() => props.onDeleteClick(el)}
          >
            delete
          </button>
          <button
            data-cy="note-item-edit"
            onClick={() => props.onEditClick(el)}
          >
            edit
          </button>
          <Link data-cy="note-item-view" to={`note/${el.id}`}>
            View
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
