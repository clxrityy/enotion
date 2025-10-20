import { render, screen } from "@testing-library/react";
import { jest, describe, it } from "@jest/globals";
import { Button } from "../src/Button.js";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDefined();
  });
});
