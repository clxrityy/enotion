import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { render, renderHook, screen } from "@testing-library/react";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "../src/useTheme";

describe("useTheme", () => {
  const { result, unmount } = renderHook(() => useTheme());

  beforeAll(() => {
    window.localStorage.clear();
    unmount();
  });

  beforeEach(() => {
    window.localStorage.clear();
    jest.resetAllMocks();
  });

  it("should have default theme as 'system'", () => {
    const { theme, setTheme } = result.current;
    expect(theme).toBe("system");
    expect(typeof setTheme).toBe("function");
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
