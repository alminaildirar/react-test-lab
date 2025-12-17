import { render, screen } from "@testing-library/react";

test("screen works", () => {
  render(<h1>Hello</h1>);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
