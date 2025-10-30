import { useIsMounted } from "../src/useIsMounted.js";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";

describe("useIsMounted", () => {
  it("should return true when component is mounted", () => {
    const { result } = renderHook(() => useIsMounted());

    expect(result.current()).toBe(true);
  });

  it("should return false when component is unmounted", () => {
    const { result, unmount } = renderHook(() => useIsMounted());

    act(() => {
      unmount();
    });

    expect(result.current()).toBe(false);
  });
});
