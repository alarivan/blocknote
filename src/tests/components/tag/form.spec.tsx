import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form from "components/tag/Form";

const propsData = {
  value: "tag name",
  onSubmit: jest.fn()
};

describe("Tag Form", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Form {...propsData} />);

    const button = getByTestId("tag-form-submit");
    const input = getByTestId("tag-form-input") as HTMLInputElement;

    fireEvent.click(button);
    fireEvent.change(input, { target: { value: "testing" } });

    expect(getByTestId("tag-form-input")).toHaveAttribute(
      "placeholder",
      "Tag Name"
    );
    expect(getByTestId("tag-form")).toBeInTheDocument();
    expect(propsData.onSubmit.mock.calls.length).toEqual(1);
    expect(input.value).toBe("testing");
  });
});
