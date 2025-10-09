import { useOutsideClick } from "../src/useOutsideClick";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import { useRef } from "react";

describe("useOutsideClick", () => {
  it("calls the callback when clicking outside the referenced element", () => {
    const callback = jest.fn();

    function TestComponent() {
      const ref = useRef(null);
      useOutsideClick({ ref, callback });

      return (
        <div>
          <div data-testid="inside" ref={ref}>
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    render(<TestComponent />);

    // Click inside the element
    fireEvent.mouseDown(screen.getByTestId("inside"));
    expect(callback).not.toHaveBeenCalled();

    // Click outside the element
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call the callback when clicking inside the referenced element", () => {
    const callback = jest.fn();

    function TestComponentInside() {
      const ref = useRef(null);
      useOutsideClick({ ref, callback });

      return (
        <div>
          <div data-testid="inside" ref={ref}>
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    render(<TestComponentInside />);

    // Click inside the element multiple times
    fireEvent.mouseDown(screen.getByTestId("inside"));
    fireEvent.mouseDown(screen.getByTestId("inside"));
    expect(callback).not.toHaveBeenCalled();
  });

  it("cleans up event listeners on unmount", () => {
    const callback = jest.fn();
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    function TestComponentUnmount() {
      const ref = useRef(null);
      useOutsideClick({ ref, callback });

      return (
        <div>
          <div data-testid="inside" ref={ref}>
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    const { unmount } = render(<TestComponentUnmount />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
