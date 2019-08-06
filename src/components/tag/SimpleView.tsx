import React from "react";
import { Tag } from "store/tags/types";

type TagProps = {
  tag: Tag;
  onClick(): void;
};

const SimpleView = (props: TagProps) => (
  <div onClick={() => props.onClick()}>{props.tag.name}</div>
);

export default SimpleView;
