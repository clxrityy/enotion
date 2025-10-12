import { Select } from "../src/Select";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach, jest } from "@jest/globals";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Select", () => {
  it("renders with default props", () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];

    render(<Select options={options} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeDefined();
  });

  it("renders with color palette", () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];

    render(<Select options={options} colorPalette="dark" />);
    const select = screen.getByRole("combobox");
    expect(select).toBeDefined();
  });

  it("renders all options", () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ];

    render(<Select options={options} />);
    const select = screen.getByRole("combobox");
    expect(select.children.length).toBe(3);
  });
});
