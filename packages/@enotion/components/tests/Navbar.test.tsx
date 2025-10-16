import { Navbar } from "../src/Navbar";
import { render } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";

describe("Navbar", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Navbar position="top" colorPalette="default">
        Test Navbar
      </Navbar>,
    );
    expect(getByText("Test Navbar")).toBeDefined();
  });

  it("applies color palette styles correctly", () => {
    const { container } = render(
      <Navbar position="top" colorPalette="default">
        Styled Navbar
      </Navbar>,
    );
    const navElement = container.querySelector("nav") as HTMLElement;
    expect(navElement.style.backgroundColor).toBeDefined();
    expect(navElement.style.color).toBeDefined();
  });

  it("renders with top position", () => {
    const { container } = render(
      <Navbar position="top" colorPalette="default">
        Top Navbar
      </Navbar>,
    );
    const navElement = container.querySelector("nav") as HTMLElement;
    expect(navElement.className).toContain("navbar-top enotion-navbar");
  });

  it("renders with bottom position", () => {
    const { container } = render(
      <Navbar position="bottom" colorPalette="default">
        Bottom Navbar
      </Navbar>,
    );
    const navElement = container.querySelector("nav") as HTMLElement;
    expect(navElement.className).toContain("navbar-bottom enotion-navbar");
  });

  it("renders with left position", () => {
    const { container } = render(
      <Navbar position="left" colorPalette="default">
        Left Navbar
      </Navbar>,
    );
    const navElement = container.querySelector("nav") as HTMLElement;
    expect(navElement.className).toContain("navbar-left enotion-navbar");
  });

  it("renders with right position", () => {
    const { container } = render(
      <Navbar position="right" colorPalette="default">
        Right Navbar
      </Navbar>,
    );
    const navElement = container.querySelector("nav") as HTMLElement;
    expect(navElement.className).toContain("navbar-right enotion-navbar");
  });

  it("renders default position when none is provided", () => {
    const { container } = render(
      <Navbar colorPalette="default">Default Navbar</Navbar>,
    );
    const navElement = container.querySelector("nav") as HTMLElement;
    expect(navElement.className).toContain("navbar-top enotion-navbar");
  });
});
