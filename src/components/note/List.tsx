import React from "react";

import { Note } from "store/notes/types";

import SimpleView from "./SimpleView";
import NotePanelButton from "components/note/NotePanelButton";

type ListProps = {
  notes: Note[];
  onDeleteClick(note: Note): void;
  onEditClick(note: Note): void;
  onViewClick(note: Note): void;
};

export const List = (props: ListProps) => {
  return (
    <ul data-cy="note-list" className="flex flex-wrap p-2">
      {props.notes.map((el: Note) => (
        <li
          data-cy="note-item"
          key={el.id}
          className="w-full border border-gray-200 mb-2 pt-2"
        >
          <SimpleView note={el} />
          <div className="flex">
            <NotePanelButton
              className="bg-red-300 hover:bg-red-400"
              label="delete"
              onClick={() => props.onDeleteClick(el)}
            />
            <NotePanelButton
              label="edit"
              className="bg-orange-300 hover:bg-orange-400"
              onClick={() => props.onEditClick(el)}
            />
            <NotePanelButton
              label="view"
              className="bg-green-300 hover:bg-green-400"
              onClick={() => props.onViewClick(el)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
