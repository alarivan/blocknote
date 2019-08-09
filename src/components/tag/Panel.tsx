import React from "react";
import { Tag } from "store/tags/types";
import SimpleView from "./SimpleView";

type PanelProps = {
  tags: Tag[];
};

export const List = (props: PanelProps) => {
  return (
    <ul data-cy="tag-panel">
      {props.tags.map((el: Tag) => (
        <li key={el.id}>
          <SimpleView showNumber={true} tag={el} onClick={() => {}} />
        </li>
      ))}
    </ul>
  );
};

export default List;
