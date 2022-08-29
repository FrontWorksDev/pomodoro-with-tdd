import {render, screen} from "@testing-library/react";
import MyComponent from "../src/MyComponent";

test('rendering "Hello Test"', () => {
  render(<MyComponent/>)
  screen.debug()
  expect(screen.getByText('Hello Test')).toBeInTheDocument()
})