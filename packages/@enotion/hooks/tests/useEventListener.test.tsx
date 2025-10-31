import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { useEventListener } from "../src/useEventListener.js";

describe("useEventListener", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should add and remove event listener on mount and unmount", () => {
    const addEventListenerSpy = jest.spyOn(
      globalThis.window,
      "addEventListener",
    );
    const removeEventListenerSpy = jest.spyOn(
      globalThis.window,
      "removeEventListener",
    );
    const handler = jest.fn();

    const { unmount } = renderHook(() => useEventListener("click", handler));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      undefined,
    );

    act(() => {
      globalThis.window.dispatchEvent(new Event("click"));
    });

    expect(handler).toHaveBeenCalledTimes(1);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      undefined,
    );
  });

  it("should update handler when it changes", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    const { rerender } = renderHook(
      ({ handler }) => useEventListener("click", handler),
      { initialProps: { handler: handler1 } },
    );

    act(() => {
      globalThis.window.dispatchEvent(new Event("click"));
    });

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(0);

    rerender({ handler: handler2 });

    act(() => {
      globalThis.window.dispatchEvent(new Event("click"));
    });

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  it("should not add event listener if element does not support it", () => {
    const handler = jest.fn();
    const invalidElement = {} as HTMLElement;

    const addEventListenerSpy = jest.spyOn(
      globalThis.window,
      "addEventListener",
    );

    renderHook(() => useEventListener("click", handler, invalidElement));

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });
});
