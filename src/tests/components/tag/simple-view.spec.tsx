import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SimpleView from "components/tag/SimpleView";
import TagModel from "models/tag";

const propsData = {
  tag: TagModel("tag1", { color: "red" }),
  onClick: jest.fn()
};

it("renders without crashing", () => {
  const { container } = render(<SimpleView {...propsData} />);
  const button = container.querySelector("[data-cy=tag-simple-view]");
  if (!button) return;

  fireEvent.click(button);

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute("style");
  expect(propsData.onClick.mock.calls.length).toEqual(1);
});
