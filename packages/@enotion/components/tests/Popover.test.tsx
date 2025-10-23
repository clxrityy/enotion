import { Popover } from "../src/Popover.js";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";

describe("Popover Component", () => {
  it("renders trigger element", () => {
    render(
      <Popover popoverContent={<div>Popover Content</div>}>
        <span>Open Popover</span>
      </Popover>,
    );
    expect(screen.getByText("Open Popover")).toBeDefined();
  });

  it("shows popover content on trigger click", () => {
    render(
      <Popover popoverContent={<div>Popover Content</div>}>
        <span>Open Popover</span>
      </Popover>,
    );
    const trigger = screen.getByText("Open Popover");
    fireEvent.click(trigger);
    expect(screen.getByText("Popover Content")).toBeDefined();
  });

  it("hides popover content on outside click", () => {
    render(
      <div>
        <Popover popoverContent={<div>Popover Content</div>}>
          <span>Open Popover</span>
        </Popover>
        <div data-testid="outside-area">Outside Area</div>
      </div>,
    );
    const trigger = screen.getByText("Open Popover");
    fireEvent.click(trigger);
    expect(screen.getByText("Popover Content")).toBeDefined();

    const outsideArea = screen.getByTestId("outside-area");
    fireEvent.mouseDown(outsideArea);
    expect(screen.queryByText("Popover Content")).toBeNull();
  });
});
