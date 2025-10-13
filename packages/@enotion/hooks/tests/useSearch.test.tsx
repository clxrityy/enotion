import { useSearch } from "../src/useSearch.js";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";

describe("useSearch", () => {
  const data = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Grapes" },
  ];

  it("should filter data based on search term", () => {
    const { result } = renderHook(() => useSearch(data, "name"));

    act(() => {
      result.current.setQuery("an");
    });
    expect(result.current.filteredData).toEqual([
      { id: 2, name: "Banana" },
      { id: 3, name: "Orange" },
    ]);

    act(() => {
      result.current.setQuery("ap");
    });
    expect(result.current.filteredData).toEqual([
      { id: 1, name: "Apple" },
      { id: 4, name: "Grapes" },
    ]);
  });

  it("should return all data when search term is empty", () => {
    const { result } = renderHook(() => useSearch(data, "name"));

    act(() => {
      result.current.setQuery("");
    });
    expect(result.current.filteredData).toEqual(data);
  });

  it("should not be case-insensitive", () => {
    const { result } = renderHook(() => useSearch(data, "name"));

    act(() => {
      result.current.setQuery("AN");
    });
    expect(result.current.filteredData).toEqual([
      { id: 2, name: "Banana" },
      { id: 3, name: "Orange" },
    ]);
  })
})
