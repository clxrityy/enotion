import { Navbar } from "../src/Navbar.js";
import { render } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";

describe("Navbar Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <Navbar
        logo={<div>Logo</div>}
        currentTheme="light"
        toggleTheme={() => {}}
        palette="default"
        onPaletteChange={() => {}}
        items={[]}
      />,
    );
    expect(getByText("Logo")).toBeDefined();
  });
});
