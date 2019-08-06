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
    <ul>
      {props.notes.map((el: Note) => (
        <li key={el.id}>
          <SimpleView note={el} onClick={() => {}} />
          <button onClick={() => props.onDeleteClick(el)}>delete</button>
          <button onClick={() => props.onEditClick(el)}>edit</button>
          <Link to={`note/${el.id}`}>View</Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
