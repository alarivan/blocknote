import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NoteList from "components/note/List";
import NoteModel from "models/note";

const propsData = {
  notes: [NoteModel(getContentState())],
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
  onViewClick: jest.fn()
};

it("renders without crashing", () => {
  const { container, getByText } = render(<NoteList {...propsData} />);
  const note = container.querySelector("[data-cy=note-item]");
  if (!note) return;

  fireEvent.click(getByText("delete"));
  fireEvent.click(getByText("edit"));
  fireEvent.click(getByText("view"));

  expect(note).toBeInTheDocument();
  expect(note).toHaveTextContent("test");
  expect(propsData.onDeleteClick.mock.calls.length).toEqual(1);
  expect(propsData.onEditClick.mock.calls.length).toEqual(1);
  expect(propsData.onViewClick.mock.calls.length).toEqual(1);
});
