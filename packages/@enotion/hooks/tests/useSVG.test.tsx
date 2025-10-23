import { useSVG } from "../src/useSVG.js";
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";

describe("useSVG", () => {
  it("should return an SVG element with the specified attributes", () => {
    const { result } = renderHook(() =>
      useSVG({
        width: 100,
        height: 100,
        src: "./mocks/logo.svg",
      }),
    );
    const svgElement = result.current;

    expect(svgElement).toBeDefined();
  });
});
