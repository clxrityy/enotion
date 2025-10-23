import { LayoutProvider } from "../src/LayoutProvider.js";
import { render } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import { useId } from "react";

describe("LayoutProvider Component", () => {
  it("renders children correctly when passed directly", () => {
    const { getByText } = render(
      <LayoutProvider>
        <div>Test Child</div>
      </LayoutProvider>,
    );
    expect(getByText("Test Child")).toBeDefined();
  });

  it("renders LayoutRenderer component", () => {
    const { container } = render(
      <LayoutProvider className="layout-renderer">
        <div>Test Child</div>
      </LayoutProvider>,
    );
    const layoutRenderer = container.querySelector(".layout-renderer");
    expect(layoutRenderer).toBeDefined();
  });

  it("applies additional props to LayoutRenderer", () => {
    const id = useId();

    const { container } = render(
      <LayoutProvider className="custom-class" id={id}>
        <div>Test Child</div>
      </LayoutProvider>,
    );
    const layoutRenderer = container.querySelector(".custom-class");
    expect(layoutRenderer).toBeDefined();
    expect(layoutRenderer?.id).toBe(id);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <LayoutProvider className="snapshot-class">
        <div>Snapshot Child</div>
      </LayoutProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
