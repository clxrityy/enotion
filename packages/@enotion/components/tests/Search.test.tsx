import { Search } from "../src/Search";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, jest } from "@jest/globals";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Search", () => {
  const data = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Grapes" },
  ];

  it("renders with default props", () => {
    render(
      <Search
        data={data}
        searchKey="name"
        render={(item) => <div>{item.name}</div>}
      />,
    );
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeDefined();
  });

  it("renders with color palette", () => {
    render(
      <Search
        data={data}
        searchKey="name"
        colorPalette="dark"
        render={(item) => <div>{item.name}</div>}
      />,
    );
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeDefined();
  });

  it("filters data based on search input", () => {
    render(
      <Search
        data={data}
        searchKey="name"
        render={(item) => <div>{item.name}</div>}
      />,
    );
    const input = screen.getByPlaceholderText("Search...");

    // Initial render should show all items
    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.getByText("Banana")).toBeDefined();
    expect(screen.getByText("Orange")).toBeDefined();
    expect(screen.getByText("Grapes")).toBeDefined();

    // Type "ap" into the search input
    fireEvent.change(input, { target: { value: "ap" } });

    // Should only show "Apple" and "Grapes"
    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.getByText("Grapes")).toBeDefined();
    expect(screen.queryByText("Banana")).toBeNull();
    expect(screen.queryByText("Orange")).toBeNull();
  });
});
