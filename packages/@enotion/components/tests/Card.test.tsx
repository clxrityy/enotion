import { Card } from "../src/Card.js";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import { ColorPalettes } from "@enotion/core/constants";
import { getRGBfromHex, convertRGBtoString } from "@enotion/core/utils";

describe("Card Component", () => {
  it("renders children correctly", () => {
    render(<Card>Test Card Content</Card>);
    expect(screen.getByText("Test Card Content")).toBeDefined();
  });

  it("applies color palette styles when colorPalette prop is provided", () => {
    // Using the "dark" palette for testing
    const palette = ColorPalettes["dark"];

    // Render the Card with the dark color palette
    render(<Card colorPalette="dark">Styled Card</Card>);
    // Get the rendered card element
    const cardElement = screen.getByText("Styled Card");
    // Get computed styles of the card element
    const styles = getComputedStyle(cardElement);

    // Check text color
    // Convert hex to rgb string for comparison
    const rgbTextColorValues = getRGBfromHex(palette.foreground as string);
    const textColor = rgbTextColorValues
      ? convertRGBtoString(
          rgbTextColorValues.r,
          rgbTextColorValues.g,
          rgbTextColorValues.b,
        )
      : "";

    expect(styles.color).toBe(textColor);
    // Check border color
    expect(styles.getPropertyValue("--card-border-color").trim()).toBe(
      palette.border as string,
    );

    // Check background color
    // Convert hex to rgb string for comparison
    const rgbBackgroundColorValues = getRGBfromHex(
      palette.background as string,
    );
    const backgroundColor = rgbBackgroundColorValues
      ? convertRGBtoString(
          rgbBackgroundColorValues.r,
          rgbBackgroundColorValues.g,
          rgbBackgroundColorValues.b,
        )
      : "";

    expect(styles.backgroundColor).toBe(backgroundColor);
  });
});
