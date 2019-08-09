import React from "react";
import { Tag } from "store/tags/types";
import SimpleView from "./SimpleView";

type ListProps = {
  tags: Tag[];
  onClick(tag: Tag): void;
};

export const List = (props: ListProps) => {
  return (
    <div className="flex my-2">
      {props.tags.map((tag: Tag) => (
        <SimpleView
          key={tag.id}
          tag={tag}
          showNumber={false}
          onClick={() => {
            props.onClick(tag);
          }}
        />
      ))}
    </div>
  );
};

export default List;
