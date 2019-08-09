import React from "react";
import { render } from "@testing-library/react";
import Home from "components/routes/Home";

it("renders without crashing", () => {
  const { container } = render(<Home />);

  expect(container).toBeInTheDocument();
});
