import { Link } from "../src/Link";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach, jest } from "@jest/globals";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Link", () => {
  it("renders with default props", () => {
    render(<Link href="https://example.com">Example</Link>);
    const link = screen.getByRole("link", { name: /example/i });
    expect(link).toBeDefined();
    expect(link).toHaveProperty("href", "https://example.com/");
  });

  it("renders with custom className", () => {
    render(
      <Link href="https://example.com" className="custom-class">
        Example
      </Link>,
    );
    const link = screen.getByRole("link", { name: /example/i });
    expect(link).toHaveProperty(
      "className",
      expect.stringContaining("custom-class"),
    );
  });

  it("renders with target and rel attributes", () => {
    render(
      <Link href="https://example.com" target="_blank" rel="noopener">
        Example
      </Link>,
    );
    const link = screen.getByRole("link", { name: /example/i });
    expect(link).toHaveProperty("target", "_blank");
    expect(link).toHaveProperty("rel", "noopener");
  });
});
