import { Provider } from "../src/Provider.js";
import { render } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import { Button } from "../src/Button.js";
import { ColorPalettes } from "@enotion/core/constants";
import { getRGBfromHex, convertRGBtoString } from "@enotion/core";


describe("Provider Component", () => {
  it("renders children correctly when passed directly", () => {
    const { getByText } = render(
      <Provider colorPalette="default">
        <div>Test Child</div>
      </Provider>,
    );
    expect(getByText("Test Child")).toBeDefined();
  });

  it("applies color palette styles correctly", () => {
    const { container } = render(
      <Provider colorPalette="default">
        <div>Styled Child</div>
      </Provider>,
    );
    const providerDiv = container.firstChild as HTMLElement;
    expect(providerDiv.style.backgroundColor).toBeDefined();
    expect(providerDiv.style.color).toBeDefined();
  });

  it("renders children with content", () => {
    const { getByText } = render(
      <Provider colorPalette="default">
        <div>Child with Palette</div>
      </Provider>,
    );
    expect(getByText("Child with Palette")).toBeDefined();
  });

  it("renders multiple children with content", () => {
    const { getByText } = render(
      <Provider colorPalette="default">
        <div>First Child</div>
        <div>Second Child</div>
      </Provider>,
    );
    expect(getByText("First Child")).toBeDefined();
    expect(getByText("Second Child")).toBeDefined();
  });

  it("passes down color palette to nested Button component", () => {
    const { getByRole } = render(
      <Provider colorPalette="default">
        <Button>Test Button</Button>
      </Provider>,
    );
    const button = getByRole("button", { name: /test button/i });
    const defaultPalette = ColorPalettes["default"];
    const primaryColor = defaultPalette?.primary;

    if (!primaryColor) {
      throw new Error("Default color palette primary color is not defined");
    }

    const rgbValues = getRGBfromHex(primaryColor);
    const expectedBgColor = rgbValues
      ? convertRGBtoString(rgbValues.r, rgbValues.g, rgbValues.b)
      : "";
    expect(button).toBeDefined();
    expect(button.style.backgroundColor).toBe(expectedBgColor);
  });
});
