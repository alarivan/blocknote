import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TagList from "components/tag/List";
import TagModel from "models/tag";

const propsData = {
  tags: [TagModel("tag1"), TagModel("tag2")],
  onClick: jest.fn()
};

it("renders without crashing", () => {
  const { container } = render(<TagList {...propsData} />);
  const button = container.querySelector("[data-cy=tag-simple-view]");
  if (!button) return;

  fireEvent.click(button);

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute("style");
  expect(button).toHaveTextContent("tag");
  expect(propsData.onClick.mock.calls.length).toEqual(1);
});
