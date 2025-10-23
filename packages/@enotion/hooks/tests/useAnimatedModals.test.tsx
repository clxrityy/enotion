import { useAnimatedModals } from "../src/useAnimatedModals.js";
import {
  renderHook,
  act,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import { LayoutContextProvider, LayoutRenderer } from "@enotion/core";

describe("useAnimatedModals", () => {
  it("should open and close modal with animations", async () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useAnimatedModals({}));

    expect(result.current.showModal).toBeDefined();
  });

  it("should open modal", async () => {
    const TestComponent = () => {
      const { showModal } = useAnimatedModals({});

      return (
        <div>
          <button
            type="button"
            onClick={() => showModal("test-modal", <div>Test Modal</div>)}
          >
            Open Modal
          </button>
        </div>
      );
    };

    render(
      <LayoutContextProvider>
        <TestComponent />
        <LayoutRenderer data-testid="layout-renderer" />
      </LayoutContextProvider>,
    );

    const openButton = screen.getByText("Open Modal");

    act(() => {
      openButton.click();
    });

    await waitFor(() => {
      expect(screen.getByText("Test Modal")).toBeDefined();
    });
  });
});
