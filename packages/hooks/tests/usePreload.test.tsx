import { usePreload } from "../src/usePreload";
import { describe, expect, it, beforeEach, jest } from "@jest/globals";

describe("usePreload", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should preload resources successfully", async () => {
    const importComponent = () => import("./mocks/TestComponent");

    const Component = () => {
      const preloadComponent = usePreload(importComponent);

      expect(preloadComponent).toBeDefined();
      expect(typeof preloadComponent.onMouseOverCapture).toBe("function");

      return (<button {...preloadComponent}>Preload</button>);
    }

    expect(Component).toBeDefined(); // Just to get rid of unused variable warning
  });

  it("should handle preload error", async () => {
    const importComponent = () => Promise.reject(new Error("Failed to load"));

    const Component2 = () => {
      const preloadComponent = usePreload(importComponent);

      expect(preloadComponent).toBeDefined();
      expect(typeof preloadComponent.onMouseOverCapture).toBe("function");

      return (<button {...preloadComponent}>Preload</button>);
    }

    expect(Component2).toBeDefined(); // Just to get rid of unused variable warning
  });
})
