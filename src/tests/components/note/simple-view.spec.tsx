import React from "react";
import { render } from "@testing-library/react";
import SimpleView from "components/note/SimpleView";
import NoteModel from "models/note";

const contentState = {
  entityMap: {},
  blocks: [
    {
      key: "9dfaj",
      text: "test",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: []
    }
  ]
};

const propsData = {
  note: NoteModel(contentState)
};

it("renders without crashing", () => {
  const { container } = render(<SimpleView {...propsData} />);
  const note = container.querySelector("[data-cy=note-body]");
  if (!note) return;

  expect(note).toBeInTheDocument();
  expect(note).toHaveTextContent("test");
});
