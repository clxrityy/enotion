import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, jest } from "@jest/globals";

import { CopyButton } from "../src/CopyButton";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("CopyButton", () => {
  it("renders with default props", () => {
    render(<CopyButton content="Sample text to copy" />);
    const button = screen.getByRole("button", { name: /copy/i });
    expect(button).toBeDefined();
  });

  it("calls onCopied when clicked", async () => {
    const handleCopy = jest.fn();
    render(<CopyButton content="Sample text to copy" onCopied={handleCopy} />);
    const button = screen.getByRole("button", { name: /copy/i });
    button.click();
    await waitFor(() => {
      expect(handleCopy).toHaveBeenCalled();
    });
  });

  it("applies color palette styles", () => {
    render(<CopyButton content="Sample text to copy" colorPalette="default" />);
    const button = screen.getByRole("button", { name: /copy/i });
    expect(button).toHaveProperty("style.backgroundColor");
    expect(button).toHaveProperty("style.color");
  });

  it("handles onCopyError prop when provided", async () => {
    const handleCopyError = jest.fn();
    Object.assign(navigator, { clipboard: undefined });
    render(<CopyButton content="Sample text to copy" onCopyError={handleCopyError} />);
    const button = screen.getByRole("button", { name: /copy/i });
    button.click();
    await waitFor(() => {
      expect(handleCopyError).toHaveBeenCalled();
    });
  });
});
