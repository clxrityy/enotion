import { useScreenSize } from "../src/useScreenSize.js";
import { renderHook, screen, render, act } from "@testing-library/react";
import { describe, expect, it, jest, afterEach } from "@jest/globals";

describe("useScreenSize", () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    jest.restoreAllMocks();
  });

  it("should return the correct screen size category", () => {
    const { result, rerender } = renderHook(() => useScreenSize());
    expect(result.current.width).toBe(1024); // Default jsdom width is 1024px
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isTablet).toBe(true); // 1024px is considered tablet
    expect(result.current.isMobile).toBe(false);

    // Simulate tablet size
    act(() => {
      globalThis.window.innerWidth = 800;
      globalThis.window.dispatchEvent(new Event("resize"));
    });
    rerender();
    expect(result.current.width).toBe(800);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isMobile).toBe(false);

    // Simulate mobile size
    act(() => {
      globalThis.window.innerWidth = 500;
      globalThis.window.dispatchEvent(new Event("resize"));
    });
    rerender();
    expect(result.current.width).toBe(500);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isMobile).toBe(true);
  });

  it("should update screen size on window resize", () => {
    const { result, rerender } = renderHook(() => useScreenSize());
    rerender();
    expect(result.current.width).toBe(1024);
    // Simulate window resize
    act(() => {
      globalThis.window.innerWidth = 600;
      globalThis.window.dispatchEvent(new Event("resize"));
    });
    rerender(); // Re-render to capture the updated state
    expect(result.current.width).toBe(600);
    expect(result.current.isMobile).toBe(true);
  });

  it("should use default size when provided", () => {
    const DefaultSizeComponent = () => {
      const { width, height } = useScreenSize({
        initialWidth: 1200,
        initialHeight: 800,
      });

      return (
        <div>
          <p>Width: {width}px</p>
          <p>Height: {height}px</p>
        </div>
      );
    };
    render(<DefaultSizeComponent />);
    expect(screen.getByText("Width: 1200px")).toBeDefined();
    expect(screen.getByText("Height: 800px")).toBeDefined();
  });

  it("should handle large desktop sizes", () => {
    const { result, rerender } = renderHook(() => useScreenSize());
    expect(result.current.isLargeDesktop).toBe(false);

    // Simulate large desktop size
    act(() => {
      globalThis.window.innerWidth = 1600;
      globalThis.window.dispatchEvent(new Event("resize"));
    });
    rerender();
    expect(result.current.width).toBe(1600);
    expect(result.current.isLargeDesktop).toBe(true);
  });

  it("should correctly identify orientation", () => {
    const { result, rerender } = renderHook(() => useScreenSize());
    expect(result.current.isLandscape).toBe(true);
    expect(result.current.isPortrait).toBe(false);

    // Simulate portrait orientation
    act(() => {
      Object.defineProperty(globalThis.window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 600,
      });
      Object.defineProperty(globalThis.window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 800,
      });
      globalThis.window.dispatchEvent(new Event("resize"));
    });
    rerender();
    expect(result.current.width).toBe(600);
    expect(result.current.height).toBe(800);
    expect(result.current.isLandscape).toBe(false);
    expect(result.current.isPortrait).toBe(true);
  });
});
