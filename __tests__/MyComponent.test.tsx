import React from "react";
import { render, screen } from "@testing-library/react";
import MyComponent from "../src/MyComponent";

test('rendering "Hello Test"', () => {
  render(<MyComponent />);
  expect(screen.getByText("Hello Test")).toBeInTheDocument();
});
