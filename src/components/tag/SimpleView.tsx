import React from "react";
import { Tag } from "store/tags/types";

type TagProps = {
  tag: Tag;
  onClick(): void;
};

const SimpleView = (props: TagProps) => {
  const styles = { tag: { backgroundColor: props.tag.color as string } };

  return (
    <button
      data-cy="tag-simple-view"
      style={styles.tag}
      className="border text-xs font-bold rounded-full text-gray-800 px-2 py-1"
      onClick={() => props.onClick()}
    >
      {props.tag.name}({props.tag.notes.length})
    </button>
  );
};

export default SimpleView;
