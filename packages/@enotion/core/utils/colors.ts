import type { Color } from "../types/colors.js";

/**
 * Convert a hex color string to its RGB components.
 * @param hex - The hex color string (e.g., "#ff5733" or "ff5733").
 * @returns An object with r, g, b properties or null if the input is invalid.
 *
 * @example
 * ```ts
 * const rgb = getRGBfromHex("#ff5733");
 * console.log(rgb); // { r: 255, g: 87, b: 51 }
 * ```
 *
 * @see {@link convertRGBtoString} - Convert RGB components to an RGB string.
 * @see {@link getHexFromRGB} - Convert RGB components back to a hex color string.
 * @see {@link lightenHexColor} - Lighten a hex color by a specified amount.
 * @see {@link darkenHexColor} - Darken a hex color by a specified amount.
 * @see {@link adjustHexColorOpacity} - Adjust the opacity of a hex color.
 * @see {@link isValidHexColor} - Validate if a string is a valid hex color.
 * @see {@link blendHexColors} - Blend two hex colors together by a specified ratio.
 * @see {@link parseColor} - Parse various color formats into a hex color string.
 */
export function getRGBfromHex(
  hex: string,
): { r: number; g: number; b: number } | null {
  if (!hex) return null;

  // Remove the leading '#' if present
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  // Handle shorthand hex codes (e.g., #03F)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Ensure the hex code is valid
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return null;
  }

  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

/**
 * Convert RGB components to an RGB string.
 * @param r - The red component (0-255).
 * @param g - The green component (0-255).
 * @param b - The blue component (0-255).
 * @returns A string in the format "rgb(r, g, b)".
 *
 * @example
 * ```ts
 * const rgbString = convertRGBtoString(255, 87, 51);
 * console.log(rgbString); // "rgb(255, 87, 51)"
 * ```
 *
 * @see {@link getRGBfromHex} - Convert a hex color string to its RGB components.
 * @see {@link getHexFromRGB} - Convert RGB components back to a hex color string.
 * @see {@link lightenHexColor} - Lighten a hex color by a specified amount.
 * @see {@link darkenHexColor} - Darken a hex color by a specified amount.
 * @see {@link adjustHexColorOpacity} - Adjust the opacity of a hex color.
 * @see {@link isValidHexColor} - Validate if a string is a valid hex color.
 * @see {@link blendHexColors} - Blend two hex colors together by a specified ratio.
 * @see {@link parseColor} - Parse various color formats into a hex color string.
 */
export function convertRGBtoString(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

/** Convert RGB components to a hex color string.
 * @param r - The red component (0-255).
 * @param g - The green component (0-255).
 * @param b - The blue component (0-255).
 * @returns A hex color string in the format "#rrggbb".
 *
 * @example
 * ```ts
 * const hexColor = getHexFromRGB(255, 87, 51);
 * console.log(hexColor); // "#ff5733"
 * ```
 *
 * @see {@link getRGBfromHex} - Convert a hex color string to its RGB components.
 * @see {@link convertRGBtoString} - Convert RGB components to an RGB string.
 * @see {@link lightenHexColor} - Lighten a hex color by a specified amount.
 * @see {@link darkenHexColor} - Darken a hex color by a specified amount.
 * @see {@link adjustHexColorOpacity} - Adjust the opacity of a hex color.
 * @see {@link isValidHexColor} - Validate if a string is a valid hex color.
 * @see {@link blendHexColors} - Blend two hex colors together by a specified ratio.
 * @see {@link parseColor} - Parse various color formats into a hex color string.
 */
export function getHexFromRGB(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Lighten a hex color by a specified amount.
 * @param hex - The hex color string (e.g., "#ff5733" or "ff5733").
 * @param amount - The amount to lighten the color (positive integer).
 * @returns A new hex color string that is lightened by the specified amount, or null if the input is invalid.
 *
 * @example
 * ```ts
 * const lightenedColor = lightenHexColor("#ff5733", 20);
 * console.log(lightenedColor); // e.g., "#ff6f4d"
 * ```
 *
 * @see {@link getRGBfromHex} - Convert a hex color string to its RGB components.
 * @see {@link convertRGBtoString} - Convert RGB components to an RGB string.
 * @see {@link getHexFromRGB} - Convert RGB components back to a hex color string.
 * @see {@link darkenHexColor} - Darken a hex color by a specified amount.
 * @see {@link adjustHexColorOpacity} - Adjust the opacity of a hex color.
 * @see {@link isValidHexColor} - Validate if a string is a valid hex color.
 * @see {@link blendHexColors} - Blend two hex colors together by a specified ratio.
 * @see {@link parseColor} - Parse various color formats into a hex color string.
 */
export function lightenHexColor(hex: string, amount: number): string | null {
  const rgb = getRGBfromHex(hex);
  if (!rgb) return null;

  const r = Math.min(255, Math.max(0, rgb.r + amount));
  const g = Math.min(255, Math.max(0, rgb.g + amount));
  const b = Math.min(255, Math.max(0, rgb.b + amount));

  return getHexFromRGB(r, g, b);
}

/** Darken a hex color by a specified amount.
 * @param hex - The hex color string (e.g., "#ff5733" or "ff5733").
 * @param amount - The amount to darken the color (positive integer).
 * @returns A new hex color string that is darkened by the specified amount, or null if the input is invalid.
 *
 * @example
 * ```ts
 * const darkenedColor = darkenHexColor("#ff5733", 20);
 * console.log(darkenedColor); // e.g., "#e6451f"
 * ```
 *
 * @see {@link getRGBfromHex} - Convert a hex color string to its RGB components.
 * @see {@link convertRGBtoString} - Convert RGB components to an RGB string.
 * @see {@link getHexFromRGB} - Convert RGB components back to a hex color string.
 * @see {@link lightenHexColor} - Lighten a hex color by a specified amount.
 * @see {@link adjustHexColorOpacity} - Adjust the opacity of a hex color.
 * @see {@link isValidHexColor} - Validate if a string is a valid hex color.
 * @see {@link blendHexColors} - Blend two hex colors together by a specified ratio.
 * @see {@link parseColor} - Parse various color formats into a hex color string.
 */
export function darkenHexColor(hex: string, amount: number): string | null {
  return lightenHexColor(hex, -amount);
}

/** Adjust the opacity of a hex color.
 * @param hex - The hex color string (e.g., "#ff5733" or "ff5733").
 * @param opacity - The desired opacity (0 to 1).
 * @returns A new hex color string with adjusted opacity in the format "#rrggbbaa", or null if the input is invalid.
 *
 * @example
 * ```ts
 * const colorWithOpacity = adjustHexColorOpacity("#ff5733", 0.5);
 * console.log(colorWithOpacity); // e.g., "#ff573380"
 * ```
 *
 * @see {@link getRGBfromHex} - Convert a hex color string to its RGB components.
 * @see {@link convertRGBtoString} - Convert RGB components to an RGB string.
 * @see {@link getHexFromRGB} - Convert RGB components back to a hex color string.
 * @see {@link lightenHexColor} - Lighten a hex color by a specified amount.
 * @see {@link darkenHexColor} - Darken a hex color by a specified amount.
 * @see {@link isValidHexColor} - Validate if a string is a valid hex color.
 * @see {@link blendHexColors} - Blend two hex colors together by a specified ratio.
 * @see {@link parseColor} - Parse various color formats into a hex color string.
 */
export function adjustHexColorOpacity(
  hex: string,
  opacity: number,
): string | null {
  const rgb = getRGBfromHex(hex);
  if (!rgb) return null;

  const alpha = Math.min(1, Math.max(0, opacity));
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hex}${alphaHex}`;
}

/** Validate if a string is a valid hex color.
 * @param hex - The hex color string to validate (e.g., "#ff5733" or "ff5733").
 * @returns True if the string is a valid hex color, false otherwise.
 *
 * @example
 * ```ts
 * console.log(isValidHexColor("#ff5733")); // true
 * console.log(isValidHexColor("ff5733"));  // true
 * console.log(isValidHexColor("#fff"));    // true
 * console.log(isValidHexColor("zzz"));     // false
 * ```
 *
 * @see {@link getRGBfromHex} - Convert a hex color string to its RGB components.
 * @see {@link convertRGBtoString} - Convert RGB components to an RGB string.
 * @see {@link getHexFromRGB} - Convert RGB components back to a hex color string.
 * @see {@link lightenHexColor} - Lighten a hex color by a specified amount.
 * @see {@link darkenHexColor} - Darken a hex color by a specified amount.
 * @see {@link adjustHexColorOpacity} - Adjust the opacity of a hex color.
 * @see {@link blendHexColors} - Blend two hex colors together by a specified ratio.
 * @see {@link parseColor} - Parse various color formats into a hex color string.
 */
export function isValidHexColor(hex: string): boolean {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex);
}

/** Blend two hex colors together by a specified ratio.
 * @param hex1 - The first hex color string (e.g., "#ff5733" or "ff5733").
 * @param hex2 - The second hex color string (e.g., "#33aaff" or "33aaff").
 * @param ratio - The blend ratio (0 to 1). 0 returns hex1, 1 returns hex2.
 * @returns A new hex color string that is a blend of the two colors, or null if either input is invalid.
 *
 * @example
 * ```ts
 * const blendedColor = blendHexColors("#ff5733", "#33aaff", 0.5);
 * console.log(blendedColor); // e.g., "#996699"
 * ```
 *
 * @see {@link getRGBfromHex} - Convert a hex color string to its RGB components.
 * @see {@link convertRGBtoString} - Convert RGB components to an RGB string.
 * @see {@link getHexFromRGB} - Convert RGB components back to a hex color string.
 * @see {@link lightenHexColor} - Lighten a hex color by a specified amount.
 * @see {@link darkenHexColor} - Darken a hex color by a specified amount.
 * @see {@link adjustHexColorOpacity} - Adjust the opacity of a hex color.
 * @see {@link isValidHexColor} - Validate if a string is a valid hex color.
 * @see {@link parseColor} - Parse various color formats into a hex color string.
 */
export function blendHexColors(
  hex1: string,
  hex2: string,
  ratio: number,
): string | null {
  const rgb1 = getRGBfromHex(hex1);
  const rgb2 = getRGBfromHex(hex2);
  if (!rgb1 || !rgb2) return null;

  const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
  const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
  const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);

  return getHexFromRGB(r, g, b);
}

/** Parse various color formats into a hex color string.
 * @param color - The color to parse. Can be a hex string, RGB array, or number.
 * @returns A hex color string (e.g., "#ff5733").
 *
 * @example
 * ```ts
 * console.log(parseColor("#ff5733"));        // "#ff5733"
 * console.log(parseColor([255, 87, 51]));    // "#ff5733"
 * console.log(parseColor([255, 87, 51, 0.5])); // "#ff573380"
 * console.log(parseColor(0xff5733));         // "#ff5733"
 * ```
 *
 * @see {@link getRGBfromHex} - Convert a hex color string to its RGB components.
 * @see {@link convertRGBtoString} - Convert RGB components to an RGB string.
 * @see {@link getHexFromRGB} - Convert RGB components back to a hex color string.
 * @see {@link lightenHexColor} - Lighten a hex color by a specified amount.
 * @see {@link darkenHexColor} - Darken a hex color by a specified amount.
 * @see {@link adjustHexColorOpacity} - Adjust the opacity of a hex color.
 * @see {@link isValidHexColor} - Validate if a string is a valid hex color.
 * @see {@link blendHexColors} - Blend two hex colors together by a specified ratio.
 */
export function parseColor(color: Color): string {
  if (typeof color === "number") {
    // Convert number to hex string
    return `#${color.toString(16).padStart(6, "0")}`;
  } else if (typeof color === "string") {
    return color;
  } else if (Array.isArray(color)) {
    // convert rgb or rgba array to hex string
    if (color.length === 3) {
      const [r, g, b] = color;
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    } else if (color.length === 4) {
      const [r, g, b, a] = color;
      const alpha = Math.round(a * 255);
      return `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)}${alpha.toString(16).padStart(2, "0")}`;
    }
  }
  return String(color);
}
