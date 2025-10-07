import { jest, describe, beforeEach, afterEach, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { useTheme, ThemeProvider } from "../src/useTheme";


// Mock matchMedia before any tests run
const mockMatchMedia = jest.fn((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe("useTheme", () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
    mockMatchMedia.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should have default theme as 'system'", () => {
    const Component = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme">{theme}</div>
          <div data-testid="setTheme">{typeof setTheme}</div>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme").textContent).toBe("system");
    expect(screen.getByTestId("setTheme").textContent).toBe("function");
  });

  it("should update theme to 'light'", () => {
    const Component = () => {
      const { theme, setTheme } = useTheme();

      // Set theme to 'light' for testing
      useEffect(() => {
        setTheme("light");
      }, [setTheme]);
      return <div data-testid="theme">{theme}</div>;
    };
    render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );

    expect(screen.getByText("light")).toBeDefined();
  });
});
