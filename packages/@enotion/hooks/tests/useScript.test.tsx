import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import { useScript } from "../src/useScript.js";

describe("useScript", () => {
  beforeEach(() => {
    // Clear any existing scripts
    document
      .querySelectorAll('script[src*="example.com"]')
      .forEach((script) => script.remove());
  });

  afterEach(() => {
    // Clean up after each test
    document
      .querySelectorAll('script[src*="example.com"]')
      .forEach((script) => script.remove());
    jest.restoreAllMocks();
  });

  it("should load script successfully", async () => {
    // Mock appendChild to capture the script element and simulate loading
    const originalAppendChild = document.head.appendChild;
    let scriptElement: HTMLScriptElement | null = null;

    const mockAppendChild = jest.fn((element: Node) => {
      if (element instanceof HTMLScriptElement) {
        scriptElement = element;
        // Simulate script load after a short delay
        setTimeout(() => {
          if (scriptElement) {
            const loadEvent = new Event("load");
            scriptElement.dispatchEvent(loadEvent);
          }
        }, 50);
      }
      return originalAppendChild.call(document.head, element);
    });

    (document.head as any).appendChild = mockAppendChild;

    const Component = () => {
      const scriptLoaded = useScript("https://example.com/test-script.js");
      return (
        <div data-testid="script-loaded">{scriptLoaded ? "true" : "false"}</div>
      );
    };

    render(<Component />);

    // Initially should be false
    expect(screen.getByTestId("script-loaded").textContent).toBe("false");

    // Wait for the script to "load"
    await waitFor(
      () => {
        expect(screen.getByTestId("script-loaded").textContent).toBe("true");
      },
      { timeout: 1000 },
    );

    // Restore original function
    document.head.appendChild = originalAppendChild;
  });
});
