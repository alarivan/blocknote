import React from "react";
import { Tag } from "store/tags/types";
import SimpleView from "./SimpleView";

type ListProps = {
  tags: Tag[];
  onDeleteClick(tag: Tag): void;
  onEditClick(tag: Tag): void;
};

export const List = (props: ListProps) => {
  return (
    <ul>
      {props.tags.map((el: Tag) => (
        <li key={el.id}>
          <SimpleView tag={el} onClick={() => {}} />
          <button onClick={() => props.onDeleteClick(el)}>delete</button>
          <button onClick={() => props.onEditClick(el)}>edit</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
