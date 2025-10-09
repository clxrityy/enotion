import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "../src/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Note: localStorage.clear() moved to individual tests where needed
  });

  afterEach(() => {
    // Clean up localStorage and restore any mocked methods after each test
    window.localStorage.clear();
    jest.restoreAllMocks();
  });

  // Helper function to mock Storage methods using jest.spyOn for proper restoration
  const mockStorageMethod = (method: keyof Storage, errorMessage: string) => {
    return jest.spyOn(Storage.prototype, method).mockImplementation(() => {
      throw new Error(errorMessage);
    });
  };

  it("should initialize with initial value when localStorage is empty", () => {
    window.localStorage.clear();
    const { result } = renderHook(() =>
      useLocalStorage<string>("testKey", "initialValue"),
    );

    const [value, , , error] = result.current;

    expect(value).toBe("initialValue");
    expect(error).toBeNull();
  });

  it("should initialize with value from localStorage if it exists", () => {
    window.localStorage.clear();
    window.localStorage.setItem("testKey", JSON.stringify("storedValue"));

    const { result } = renderHook(() =>
      useLocalStorage<string>("testKey", "initialValue"),
    );

    const [value, , , error] = result.current;

    expect(value).toBe("storedValue");
    expect(error).toBeNull();
  });

  it("should update localStorage when setter is called", () => {
    window.localStorage.clear();
    const { result } = renderHook(() =>
      useLocalStorage<string>("testKey", "initialValue"),
    );

    const [, setValue, , error] = result.current;

    act(() => {
      setValue("newValue");
    });

    const [value] = result.current;

    expect(value).toBe("newValue");
    expect(window.localStorage.getItem("testKey")).toBe(
      JSON.stringify("newValue"),
    );
    expect(error).toBeNull();
  });

  it("should remove item from localStorage when remove function is called", () => {
    window.localStorage.clear();
    window.localStorage.setItem("testKey", JSON.stringify("storedValue"));

    const { result } = renderHook(() =>
      useLocalStorage<string>("testKey", "initialValue"),
    );

    const [, , removeValue, error] = result.current;

    act(() => {
      removeValue();
    });

    expect(window.localStorage.getItem("testKey")).toBeNull();
    expect(error).toBeNull();
  });

  it("should handle JSON parse error gracefully", () => {
    window.localStorage.clear();
    window.localStorage.setItem("testKey", "invalid JSON");

    const { result } = renderHook(() =>
      useLocalStorage<string>("testKey", "initialValue"),
    );

    const [value, , , error] = result.current;

    expect(value).toBe("initialValue");
    expect(error).toBeInstanceOf(Error);
  });

  it("should handle localStorage setItem error gracefully", () => {
    window.localStorage.clear();
    mockStorageMethod("setItem", "setItem error");

    const { result } = renderHook(() =>
      useLocalStorage<string>("testKey", "initialValue"),
    );

    const [initialValue, setValue, , initialError] = result.current;
    expect(initialValue).toBe("initialValue");
    expect(initialError).toBeNull();

    act(() => {
      setValue("newValue");
    });

    const [value, , , updatedError] = result.current;

    expect(value).toBe("newValue");
    expect(updatedError).toBeInstanceOf(Error);
    expect(updatedError?.message).toBe("setItem error");
  });

  it("should handle localStorage removeItem error gracefully", () => {
    window.localStorage.clear();
    // Set up initial value - make sure it's there
    window.localStorage.setItem("testKey", JSON.stringify("storedValue"));

    // Verify localStorage actually has the value
    expect(window.localStorage.getItem("testKey")).toBe(
      JSON.stringify("storedValue"),
    );

    // First render the hook to get the stored value
    const { result } = renderHook(() =>
      useLocalStorage<string>("testKey", "initialValue"),
    );

    // Verify initial state
    const [initialValue, , removeValue, initialError] = result.current;
    expect(initialValue).toBe("storedValue");
    expect(initialError).toBeNull();

    // Now mock removeItem to throw an error
    mockStorageMethod("removeItem", "removeItem error");

    act(() => {
      removeValue();
    });

    const [value, , , updatedError] = result.current;

    expect(value).toBeUndefined();
    expect(updatedError).toBeInstanceOf(Error);
    expect(updatedError?.message).toBe("removeItem error");
  });
});
