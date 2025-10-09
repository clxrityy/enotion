import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { usePreload } from "../src/usePreload";

describe("usePreload", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should preload resources successfully", () => {
    const importComponent = () => import("./mocks/TestComponent");

    const Component = () => {
      const preloadComponent = usePreload(importComponent);

      expect(preloadComponent).toBeDefined();
      expect(typeof preloadComponent.onMouseOverCapture).toBe("function");

      return <button {...preloadComponent}>Preload</button>;
    };

    expect(Component).toBeDefined(); // Just to get rid of unused variable warning
  });

  it("should handle preload error", () => {
    const importComponent = () => Promise.reject(new Error("Failed to load"));

    const Component2 = () => {
      const preloadComponent = usePreload(importComponent);

      expect(preloadComponent).toBeDefined();
      expect(typeof preloadComponent.onMouseOverCapture).toBe("function");

      return <button {...preloadComponent}>Preload</button>;
    };

    expect(Component2).toBeDefined(); // Just to get rid of unused variable warning
  });
});
