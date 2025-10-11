import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach, jest } from "@jest/globals";
import { Input } from "../src/Input";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeDefined();
  });
});
