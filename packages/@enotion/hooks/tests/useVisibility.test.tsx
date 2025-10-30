import { useVisibility } from "../src/useVisibility.js";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useRef } from "react";

describe("useVisibility", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    originalIntersectionObserver = (globalThis as any).IntersectionObserver;

    // Mock IntersectionObserver
    const mockObserve = jest.fn();
    const mockUnobserve = jest.fn();
    const mockDisconnect = jest.fn();

    class MockIntersectionObserver {
      constructor(private callback: IntersectionObserverCallback) { }

      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;

      // Simulate an intersection change
      triggerIntersect = (isIntersecting: boolean) => {
        const entries: IntersectionObserverEntry[] = [
          {
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: isIntersecting ? 1 : 0,
            intersectionRect: {} as DOMRectReadOnly,
            isIntersecting,
            rootBounds: null,
            target: {} as Element,
            time: Date.now(),
          },
        ];
        this.callback(entries, this as unknown as IntersectionObserver);
      };
    }

    (globalThis as any).IntersectionObserver = MockIntersectionObserver;
  });

  afterEach(() => {
    // Restore original IntersectionObserver
    (globalThis as any).IntersectionObserver = originalIntersectionObserver;
    jest.restoreAllMocks();
  });

  it("should return false when element is not visible", () => {
    const Invisible = () => {
      const elementRef = useRef<HTMLDivElement>(null);
      const isVisible = useVisibility({
        elementRef,
      });
      return (
        <div ref={elementRef} data-testid="visibility">
          {isVisible ? "true" : "false"}
        </div>
      );
    };

    render(<Invisible />);

    expect(screen.getByTestId("visibility").textContent).toBe("false");
  });

  it("should return true when element is always visible", () => {
    const AlwaysVisible = () => {
      const elementRef = useRef<HTMLDivElement>(null);
      const isVisible = useVisibility({
        elementRef,
        alwaysVisible: true,
      });

      return (
        <div ref={elementRef} data-testid="visibility">
          {isVisible ? "true" : "false"}
        </div>
      );
    };

    render(<AlwaysVisible />);
    expect(screen.getByTestId("visibility").textContent).toBe("true");
  });

  it("should return true when element becomes visible", async () => {
    let triggerIntersect: (isIntersecting: boolean) => void;

    // Override the mock to capture the triggerIntersect method
    (globalThis as any).IntersectionObserver = class {
      constructor(private callback: IntersectionObserverCallback) {
        triggerIntersect = (isIntersecting: boolean) => {
          const entries: IntersectionObserverEntry[] = [
            {
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRatio: isIntersecting ? 1 : 0,
              intersectionRect: {} as DOMRectReadOnly,
              isIntersecting,
              rootBounds: null,
              target: {} as Element,
              time: Date.now(),
            },
          ];
          this.callback(entries, this as unknown as IntersectionObserver);
        };
      }

      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    };

    const Visible = () => {
      const elementRef = useRef<HTMLDivElement>(null);
      const isVisible = useVisibility({
        elementRef,
      });

      return (
        <div ref={elementRef} data-testid="visibility">
          {isVisible ? "true" : "false"}
        </div>
      );
    };

    render(<Visible />);

    // Initially should be false
    expect(screen.getByTestId("visibility").textContent).toBe("false");

    // Simulate the element becoming visible
    act(() => {
      triggerIntersect?.(true);
    });

    // Wait for the component to re-render with the new state
    await waitFor(() => {
      expect(screen.getByTestId("visibility").textContent).toBe("true");
    });
  });
});
