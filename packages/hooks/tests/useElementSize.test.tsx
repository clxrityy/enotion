// Mock ResizeObserver for Jest environment
class ResizeObserverMock {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    ResizeObserverMock.instances.push(this);
  }
  observe(_target: Element) { /* no-op */ }
  unobserve(_target: Element) { /* no-op */ }
  disconnect() { /* no-op */ }
  public static readonly instances: ResizeObserverMock[] = [];
  static invokeAll() {
    for (const inst of ResizeObserverMock.instances) {
      inst.callback([], inst as unknown as ResizeObserver);
    }
  }
}

global.ResizeObserver = ResizeObserverMock as any;
import { useElementSize } from "../src/useElementSize";
import { render, act, waitFor } from "@testing-library/react";
import { useRef, useEffect } from "react";
import { describe, it, expect, beforeEach, afterEach, jest } from "@jest/globals";

describe("useElementSize", () => {
  let originalOffsetWidth: any;
  let originalOffsetHeight: any;
  let originalGetComputedStyle: any;

  beforeEach(() => {
    // Mock offsetWidth/offsetHeight
    originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetWidth");
    originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight");
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      get: () => 123,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      get: () => 456,
    });
    // Mock getComputedStyle
    originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = jest.fn((_elt: Element, _pseudoElt?: string | null): CSSStyleDeclaration => {
      return {
        borderRadius: "8px",
        getPropertyValue: (prop: string) => (prop === "borderRadius" ? "8px" : ""),
      } as Partial<CSSStyleDeclaration> as CSSStyleDeclaration;
    }) as typeof window.getComputedStyle;
  });

  afterEach(() => {
    // Restore mocks
    if (originalOffsetWidth) {
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", originalOffsetWidth);
    }
    if (originalOffsetHeight) {
      Object.defineProperty(HTMLElement.prototype, "offsetHeight", originalOffsetHeight);
    }
    window.getComputedStyle = originalGetComputedStyle;
  });

  it("returns initial size and borderRadius", () => {
    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null);
      const size = useElementSize(ref);
      return <div ref={ref} data-testid="target">{JSON.stringify(size)}</div>;
    }
    const { getByTestId } = render(<TestComponent />);
    const sizeObj = JSON.parse(getByTestId("target").textContent!);
    expect(sizeObj.width).toBe(123);
    expect(sizeObj.height).toBe(456);
    expect(sizeObj.borderRadius).toBe("8px");
  });

  it("updates size when element is resized", async () => {
    let refEl: HTMLDivElement | null = null;
    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null);
      const size = useElementSize(ref);
      useEffect(() => {
        refEl = ref.current;
      }, []);
      return <div ref={ref} data-testid="target">{JSON.stringify(size)}</div>;
    }
    const { getByTestId } = render(<TestComponent />);
    // Wait until refEl is set by effect
    await waitFor(() => {
      expect(refEl).not.toBeNull();
    });
    await act(async () => {
      Object.defineProperty(refEl!, "offsetWidth", {
        configurable: true,
        get: () => 200,
      });
      Object.defineProperty(refEl!, "offsetHeight", {
        configurable: true,
        get: () => 300,
      });
      ResizeObserverMock.invokeAll();
    });
    await waitFor(() => {
      const sizeObj = JSON.parse(getByTestId("target").textContent!);
      expect(sizeObj.width).toBe(200);
      expect(sizeObj.height).toBe(300);
    });
  });

  it("returns default values if ref is null", () => {
    function TestComponent() {
      // ref is always null
      const ref = { current: null };
      const size = useElementSize(ref);
      return <div data-testid="target">{JSON.stringify(size)}</div>;
    }
    const { getByTestId } = render(<TestComponent />);
    const sizeObj = JSON.parse(getByTestId("target").textContent!);
    expect(sizeObj.width).toBe(0);
    expect(sizeObj.height).toBe(0);
    expect(sizeObj.borderRadius).toBe("0px");
  });
});
