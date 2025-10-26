import { Navbar, NavItem } from "../src/Navbar.js";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import { Theme } from "@enotion/hooks";

describe("Navbar Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <Navbar
        logo={<div>Logo</div>}
        currentTheme="light"
        toggleTheme={() => { }}
        palette="default"
        onPaletteChange={() => { }}
        items={[]}
      />,
    );
    expect(getByText("Logo")).toBeDefined();
  });

  const navItems: NavItem[] = [
    {
      label: "Home",
    },
    {
      label: "Submenu",
      subItems: [
        { label: "Subitem 1" },
        { label: "Subitem 2" },
      ],
    }
  ];

  it("renders navigation items", async () => {
    const { getByText, container } = render(
      <Navbar
        logo={<div>Logo</div>}
        currentTheme="light"
        toggleTheme={() => { }}
        items={navItems}
      />,
    );

    // Find the popover trigger button by class
    const menuButton = container.querySelector('.enotion-popover-trigger');
    expect(menuButton).toBeTruthy();

    // Use fireEvent to click the button
    fireEvent.click(menuButton!);

    // Wait for items to be accessible after opening the menu
    await waitFor(() => {
      expect(getByText("Home")).toBeDefined();
      expect(getByText("Submenu")).toBeDefined();
    });
  });

  it("renders submenu items", async () => {
    const { getByText, queryByText, container } = render(
      <Navbar
        logo={<div>Logo</div>}
        currentTheme="light"
        toggleTheme={() => { }}
        onPaletteChange={() => { }}
        items={navItems}
      />,
    );

    // Find the popover trigger button by class
    const menuButton = container.querySelector('.enotion-popover-trigger');
    expect(menuButton).toBeTruthy();

    // Use fireEvent to click the button
    fireEvent.click(menuButton!);

    // Wait for the main menu items to be visible
    await waitFor(() => {
      expect(getByText("Home")).toBeDefined();
      expect(getByText("Submenu")).toBeDefined();
    });

    // Look for submenu items (they should be visible in mobile view)
    await waitFor(() => {
      const subitem1 = queryByText("Subitem 1");
      const subitem2 = queryByText("Subitem 2");
      expect(subitem1).toBeDefined();
      expect(subitem2).toBeDefined();
    });
  });  // Theme toggling
  it("toggles theme", () => {
    let theme: Theme = "dark";

    const toggleTheme = () => {
      theme = theme === "dark" ? "light" : "dark";
    };

    const { getByLabelText, rerender } = render(
      <Navbar
        logo={<div>Logo</div>}
        currentTheme={theme}
        toggleTheme={toggleTheme}
        palette="default"
        onPaletteChange={() => { }}
        items={navItems}
      />,
    );

    const themeToggleButton = getByLabelText("Toggle theme");
    expect(theme).toBe("dark");

    // Simulate click to toggle theme
    themeToggleButton.click();
    rerender(
      <Navbar
        logo={<div>Logo</div>}
        currentTheme={theme}
        toggleTheme={toggleTheme}
        palette="default"
        onPaletteChange={() => { }}
        items={navItems}
      />,
    );
    expect(theme).toBe("light");
  });
});
