import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NotePanelButton from "components/note/NotePanelButton";

const propsData = {
  label: "label",
  className: "fake",
  onClick: jest.fn()
};

it("renders without crashing", () => {
  const { container } = render(<NotePanelButton {...propsData} />);
  const button = container.querySelector("[data-cy=note-panel-button]");
  if (!button) return;

  fireEvent.click(button);

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("label");
  expect(propsData.onClick.mock.calls.length).toEqual(1);
});
