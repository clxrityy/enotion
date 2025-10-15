import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useClipboard } from "../src/useClipboard";

describe("useClipboard", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should copy text to clipboard successfully", async () => {
    const mockWriteText = jest.fn()
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    const Component = () => {
      const { isCopied, copy } = useClipboard({
        onCopy: (text) => console.log(`Copied: ${text}`),
        onError: (error) => console.error(`Copy failed: ${error.message}`),
      });

      return (
        <div>
          <button onClick={() => copy("Hello, World!")}>
            {isCopied ? "Copied!" : "Copy Text"}
          </button>
        </div>
      );
    };

    render(<Component />);

    const button = screen.getByText("Copy Text");
    expect(button).toBeDefined();

    // Simulate button click to copy text
    act(() => {
      button.click();
    });

    // // Wait for the next tick to allow state updates
    // await act(() => new Promise((r) => setTimeout(r, 0)));

    expect(mockWriteText).toHaveBeenCalledWith("Hello, World!");
    await waitFor(() => expect(screen.getByText("Copied!")).toBeDefined(), { timeout: 500 });
  });

  it("should handle clipboard API not supported", async () => {
    Object.assign(navigator, {
      clipboard: undefined,
    });

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

    const Component = () => {
      const { isCopied, copy } = useClipboard({
        onCopy: (text) => console.log(`Copied: ${text}`),
        onError: (error) => console.error(`Copy failed: ${error.message}`), // This should be called
      });

      return (
        <div>
          <button onClick={() => copy("Hello, World!")}>
            {isCopied ? "Copied!" : "Copy Text"}
          </button>
        </div>
      );
    };

    render(<Component />);

    const button = screen.getByText("Copy Text");
    expect(button).toBeDefined();

    // Simulate button click to copy text
    act(() => {
      button.click();
    });

    // Wait for the next tick to allow state updates
    await act(() => new Promise((r) => setTimeout(r, 0)));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Copy failed: Clipboard API not supported"
    );
    expect(screen.getByText("Copy Text")).toBeDefined(); // isCopied should remain false

    consoleErrorSpy.mockRestore();
  });
});
