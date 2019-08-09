import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { EditorState } from "draft-js";
import EditorForm from "components/note/EditorForm";

const propsData = {
  value: EditorState.createEmpty(),
  onSubmit: jest.fn()
};

// Crashes on render
describe("Note EditorForm", () => {
  it("renders without crashing", () => {
    const { container, getByTestId } = render(<EditorForm {...propsData} />);

    const button = getByTestId("note-form-submit");

    fireEvent.click(button);

    expect(container).toBeInTheDocument();
    expect(propsData.onSubmit.mock.calls.length).toEqual(1);
  });
});
