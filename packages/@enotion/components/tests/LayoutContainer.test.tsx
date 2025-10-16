import { LayoutContainer } from "../src/LayoutContainer.js";
import { render } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import { Button } from "../src/Button.js";
import { ColorPalettes } from "@enotion/core/constants";
import { getRGBfromHex } from "@enotion/core/utils";

describe("LayoutContainer", () => {
  it("renders children correctly when passed directly", () => {
    const { getByText } = render(
      <LayoutContainer
        colorPalette="default"
        renderChildren={<div>Test Child</div>}
      />,
    );
    expect(getByText("Test Child")).toBeDefined();
  });

  it("renders children correctly when passed via function", () => {
    const { getByText } = render(
      <LayoutContainer
        colorPalette="default"
        renderChildren={() => [
          <div key="1">Child 1</div>,
          <div key="2">Child 2</div>,
        ]}
      />,
    );
    expect(getByText("Child 1")).toBeDefined();
    expect(getByText("Child 2")).toBeDefined();
  });

  it("applies color palette styles correctly", () => {
    const { container } = render(
      <LayoutContainer
        colorPalette="default"
        renderChildren={<div>Styled Child</div>}
      />,
    );
    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv.style.backgroundColor).toBeDefined();
    expect(layoutDiv.style.color).toBeDefined();
  });

  it("renders children with content", () => {
    const { getByText } = render(
      <LayoutContainer
        colorPalette="default"
        renderChildren={() => <div>Child with Palette</div>}
      />,
    );
    expect(getByText("Child with Palette")).toBeDefined();
  });

  it("renders multiple children with content", () => {
    const { getByText } = render(
      <LayoutContainer
        colorPalette="default"
        renderChildren={() => [
          <div key="1">First Child</div>,
          <div key="2">Second Child</div>,
        ]}
      />,
    );
    expect(getByText("First Child")).toBeDefined();
    expect(getByText("Second Child")).toBeDefined();
  });

  it("handles absence of colorPalette gracefully", () => {
    const { container } = render(
      <LayoutContainer renderChildren={<div>No Palette Child</div>} />,
    );
    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv.style.backgroundColor).toBe("");
    expect(layoutDiv.style.color).toBe("");
  });

  it("passes colorPalette prop to children", () => {
    const Layout = () => (
      <LayoutContainer
        colorPalette="default"
        renderChildren={() => <Button>Button Child</Button>}
      />
    );

    const color = getRGBfromHex(ColorPalettes["default"].primary)!;
    const buttonBgColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

    const { getByText } = render(<Layout />);
    const button = getByText("Button Child");
    expect(button).toBeDefined();
    expect(button.style.backgroundColor).toBe(buttonBgColor);
  });

  it("does not override existing colorPalette prop on children", () => {
    const Layout = () => (
      <LayoutContainer
        colorPalette="default"
        renderChildren={() => (
          <Button colorPalette="solarized">Button Child</Button>
        )}
      />
    );

    const color = getRGBfromHex(ColorPalettes["solarized"].primary)!;
    const buttonBgColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

    const { getByText } = render(<Layout />);
    const button = getByText("Button Child");
    expect(button).toBeDefined();
    expect(button.style.backgroundColor).toBe(buttonBgColor);
  });

  it("handles nested children and fragments", () => {
    const Layout = () => (
      <LayoutContainer
        colorPalette="default"
        renderChildren={() => (
          <>
            <div>Fragment Child 1</div>
            <div>
              <Button>Nested Button Child</Button>
            </div>
          </>
        )}
      />
    );

    const color = getRGBfromHex(ColorPalettes["default"].primary)!;
    const buttonBgColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

    const { getByText } = render(<Layout />);
    expect(getByText("Fragment Child 1")).toBeDefined();
    const button = getByText("Nested Button Child");
    expect(button).toBeDefined();
    expect(button.style.backgroundColor).toBe(buttonBgColor);
  });
});
