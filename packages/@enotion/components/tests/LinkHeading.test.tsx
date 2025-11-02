import { LinkHeading } from "../src/LinkHeading.js";
import { render } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";

describe("LinkHeading", () => {
  it("renders heading with correct level", () => {
    const { container } = render(<LinkHeading level={2}>Test Heading</LinkHeading>);

    const headingElement = container.querySelector("h2");
    expect(headingElement).toBeDefined();
    expect(headingElement?.textContent).toContain("Test Heading");
  });

  it("renders all heading levels correctly", () => {
    const levels = [1, 2, 3, 4, 5, 6] as const;

    for (const level of levels) {
      const { container } = render(<LinkHeading level={level}>Level {level}</LinkHeading>);
      const headingElement = container.querySelector(`h${level}`);

      expect(headingElement).toBeDefined();
      expect(headingElement?.textContent).toContain(`Level ${level}`);
    }
  });

  it("renders with link wrapping the heading", () => {
    const { container } = render(<LinkHeading level={2}>Test Heading</LinkHeading>);

    const linkElement = container.querySelector("a");
    const headingElement = container.querySelector("h2");

    expect(linkElement).toBeDefined();
    expect(headingElement).toBeDefined();
    expect(linkElement?.contains(headingElement!)).toBe(true);
  });

  it("generates correct href from children text", () => {
    const { container } = render(<LinkHeading level={2}>Test Heading</LinkHeading>);

    const linkElement = container.querySelector("a");
    expect(linkElement?.getAttribute("href")).toBe("#test-heading");
  });

  it("handles multiple words in href generation", () => {
    const { container } = render(<LinkHeading level={3}>Multiple Word Heading Here</LinkHeading>);

    const linkElement = container.querySelector("a");
    expect(linkElement?.getAttribute("href")).toBe("#multiple-word-heading-here");
  });

  it("renders hash icon", () => {
    const { container } = render(<LinkHeading level={2}>Test Heading</LinkHeading>);

    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeDefined();
  });

  it("applies group class to heading", () => {
    const { container } = render(<LinkHeading level={2}>Test Heading</LinkHeading>);

    const headingElement = container.querySelector("h2");
    expect(headingElement?.classList.contains("group")).toBe(true);
  });

  it("applies color palette when provided", () => {
    const { container } = render(
      <LinkHeading level={2} palette="dark">Test Heading</LinkHeading>
    );

    const linkElement = container.querySelector("a");
    expect(linkElement).toBeDefined();
    // Link component should receive the palette prop and set CSS variables
    const style = linkElement?.getAttribute("style");
    expect(style).toBeTruthy();
  });

  it("renders children content correctly", () => {
    const { container } = render(<LinkHeading level={2}>Custom Content</LinkHeading>);

    const spanElement = container.querySelector("span");
    expect(spanElement?.textContent).toBe("Custom Content");
  });

  it("handles non-string children", () => {
    const { container } = render(
      <LinkHeading level={2}>
        <span>Nested Content</span>
      </LinkHeading>
    );

    const headingElement = container.querySelector("h2");
    expect(headingElement?.textContent).toContain("Nested Content");
  });

  it("generates empty href for non-string children", () => {
    const { container } = render(
      <LinkHeading level={2}>
        <span>Nested</span>
      </LinkHeading>
    );

    const linkElement = container.querySelector("a");
    expect(linkElement?.getAttribute("href")).toBe("#");
  });

  it("hash icon has transition class", () => {
    const { container } = render(<LinkHeading level={2}>Test</LinkHeading>);

    const svgElement = container.querySelector("svg");
    expect(svgElement?.classList.contains("transition-opacity")).toBe(true);
  });
});
