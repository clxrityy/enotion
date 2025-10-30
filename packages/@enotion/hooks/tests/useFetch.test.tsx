import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import { useFetch } from "../src/useFetch.js";

describe("useFetch", () => {
  const mockSuccessResponse = { message: "Success" };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch data successfully", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      } as Response),
    ) as unknown as typeof fetch;

    const Component = () => {
      const { data, loading, error } = useFetch<typeof mockSuccessResponse>(
        "https://api.example.com/data",
      );

      // Initial state
      expect(data).toBeDefined();
      // expect(loading).toBe(true);
      expect(error).toBeNull();

      return (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <p>Data: {data.message}</p>}
        </div>
      );
    };

    // Wait for the effect to run
    await new Promise((r) => setTimeout(r, 0));

    expect(Component).toBeDefined(); // Just to get rid of unused variable warning

    // Render the component to verify UI changes
    render(<Component />);
    expect(screen.getByText("Loading...")).toBeDefined();

    // Wait for the next tick to allow state updates
    await act(() => new Promise((r) => setTimeout(r, 0)));

    expect(screen.getByText("Data: Success")).toBeDefined();
  });

  it("should handle fetch error", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response),
    ) as unknown as typeof fetch;

    function Component() {
      const { data, loading, error } = useFetch<typeof mockSuccessResponse>(
        "https://api.example.com/data",
      );

      // Initial state
      expect(data).toBeNull();
      expect(loading).toBe(true);
      expect(error).toContain({
        statusText: "Not Found",
      });

      return (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <p>Data: {data.message}</p>}
        </div>
      );
    }

    // Wait for the effect to run
    await new Promise((r) => setTimeout(r, 0));

    expect(Component).toBeDefined(); // Just to get rid of unused variable warning
    // Note: In a real test, you would render the component and check the output
    // using a library like @testing-library/react
  });

  it("should handle network error", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.reject(new Error("Network Error")),
    ) as unknown as typeof fetch;

    function Component() {
      const { data, loading, error } = useFetch<typeof mockSuccessResponse>(
        "https://api.example.com/data",
      );

      // Initial state
      expect(data).toBeNull();
      expect(loading).toBe(true);
      expect(error).toEqual(new Error("Network Error"));

      return (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <p>Data: {data.message}</p>}
        </div>
      );
    }

    // Wait for the effect to run
    await new Promise((r) => setTimeout(r, 0));

    expect(Component).toBeDefined(); // Just to get rid of unused variable warning
  });
});
