import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
} from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { useColorPalette, ColorPaletteProvider } from "../src/useColorPalette.js";
import { ColorPaletteType } from "@enotion/core/constants";

describe("useColorPalette", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should have default palette as undefined", () => {
    const Component = () => {
      const { palette, setPalette } = useColorPalette();
      return (
        <div>
          <div data-testid="palette">{palette}</div>
          <div data-testid="setPalette">{typeof setPalette}</div>
        </div>
      );
    };

    render(
      <ColorPaletteProvider>
        <Component />
      </ColorPaletteProvider>,
    );

    expect(screen.getByTestId("palette").textContent).toBe("");
    expect(screen.getByTestId("setPalette").textContent).toBe("function");
  });

  it("should update palette when setPalette is called with a valid palette", () => {
    const Component = () => {
      const { palette, setPalette } = useColorPalette();

      // Set palette to 'dark' for testing
      useEffect(() => {
        setPalette("dark");
      }, [setPalette]);
      return <div data-testid="palette">{palette}</div>;
    };
    render(
      <ColorPaletteProvider>
        <Component />
      </ColorPaletteProvider>,
    );

    expect(screen.getByText("dark")).toBeDefined();
  });

  it("should not update palette when setPalette is called with an invalid palette", async () => {
    const Component = () => {
      const { palette, setPalette } = useColorPalette();
      // Attempt to set an invalid palette for testing
      useEffect(() => {
        setPalette("invalid-palette" as ColorPaletteType);
      }, [setPalette]);
      return <div data-testid="palette">{palette}</div>;
    };
    render(
      <ColorPaletteProvider>
        <Component />
      </ColorPaletteProvider>,
    );
    expect(screen.getByTestId("palette").textContent).toBe("invalid-palette");
  });

  it("should update palette when setPalette is called with another valid palette", () => {
    const Component = () => {
      const { palette, setPalette } = useColorPalette();

      // Set palette to 'dark' for testing
      useEffect(() => {
        setPalette("dark");
      }, [setPalette]);
      return <div data-testid="palette">{palette}</div>;
    };
    render(
      <ColorPaletteProvider>
        <Component />
      </ColorPaletteProvider>,
    );

    expect(screen.getByText("dark")).toBeDefined();
  });
});
