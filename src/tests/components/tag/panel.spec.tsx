import React from "react";
import { render } from "@testing-library/react";
import Panel from "components/tag/Panel";
import TagModel from "models/tag";

const tags = [TagModel("tag1", { color: "red" })];

it("renders without crashing", () => {
  const { container } = render(<Panel tags={tags} />);

  expect(container.querySelector("[data-cy=tag-panel]")).toBeInTheDocument();
});
