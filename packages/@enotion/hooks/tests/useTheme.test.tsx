import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
} from "@jest/globals";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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

Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: mockMatchMedia,
});

describe("useTheme", () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
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
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme").textContent).toBe("system");
    expect(screen.getByTestId("setTheme").textContent).toBe("function");
  });

  it("should update theme to 'light'", async () => {
    const Component = () => {
      const { theme, setTheme } = useTheme();

      return (
        <>
          <div data-testid="theme">{theme}</div>
          <button
            type="button"
            data-testid="set-light-button"
            onClick={() => setTheme("light")}
          >
            Set Light
          </button>
        </>
      );
    };

    render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );

    // Initially should be system
    expect(screen.getByTestId("theme").textContent).toBe("system");

    // Click to set theme to light
    const button = screen.getByTestId("set-light-button");
    fireEvent.click(button);

    // Wait for theme update
    await waitFor(() => {
      expect(screen.getByTestId("theme").textContent).toBe("light");
    });
  });
});
