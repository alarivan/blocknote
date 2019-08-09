import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SimpleView from "components/tag/SimpleView";
import TagModel from "models/tag";

const propsData = {
  tag: TagModel("tag", { color: "red", notes: ["one", "two"] }),
  showNumber: false,
  onClick: jest.fn()
};

describe("Tag SimpleView", () => {
  it("renders without crashing", () => {
    const { container } = render(<SimpleView {...propsData} />);
    const button = container.querySelector("[data-cy=tag-simple-view]");
    if (!button) return;

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("style");
    expect(button).toHaveTextContent("tag");
    expect(propsData.onClick.mock.calls.length).toEqual(1);
  });

  it("shows correct number of notes when showNumber is true", () => {
    propsData.showNumber = true;
    const { container } = render(<SimpleView {...propsData} />);

    expect(container).toHaveTextContent("tag (2)");
  });
});
