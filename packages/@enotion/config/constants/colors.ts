export type Color =
  | number
  | string
  | [number, number, number]
  | [number, number, number, number];

export type ColorPalleteColors = {
  background: Color;
  foreground: Color;
  border: Color;
  primary: Color;
  secondary: Color;
  tertiary: Color;
  accent: Color;
  highlight: Color;
  muted: Color;
  success: Color;
  warning: Color;
  error: Color;
  info: Color;
};

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

/**
 * A collection of predefined color palettes.
 * Each palette includes colors for various UI elements.
 * - `default`: A clean and modern palette with blue accents.
 * - `dark`: A dark theme with vibrant accent colors.
 * - `solarized`: A balanced palette based on the Solarized color scheme.
 * - `warmSpring`: A soft and warm palette with pastel tones.
 * - `trustInBlue`: A professional palette with shades of blue and gray.
 * - `contemporaryCollegiate`: A fresh palette with collegiate-inspired colors.
 * - `moodyRose`: A sophisticated palette with rose and muted tones.
 * @see https://augustash.com/blog/website-ux-design/25-amazing-website-color-schemes
 */

export const ColorPalettes: Record<string, ColorPalleteColors> = {
  default: {
    background: "#ffffff",
    foreground: "#000000",
    border: "#e0e0e0",
    primary: "#1e90ff",
    secondary: "#ff6347",
    tertiary: "#32cd32",
    accent: "#ff69b4",
    highlight: "#ffff00",
    muted: "#f0f0f0",
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    info: "#17a2b8",
  },
  dark: {
    background: "#121212",
    foreground: "#ffffff",
    border: "#333333",
    primary: "#1e90ff",
    secondary: "#1f7f7f",
    tertiary: "#865777",
    accent: "#ff69b4",
    highlight: "#ffff00",
    muted: "#2c2c2c",
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    info: "#17a2b8",
  },
  solarized: {
    background: "#fdf6e3",
    foreground: "#657b83",
    border: "#eee8d5",
    primary: "#268bd2",
    secondary: "#d33682",
    tertiary: "#2aa198",
    accent: "#6c71c4",
    highlight: "#b58900",
    muted: "#eee8d5",
    success: "#859900",
    warning: "#cb4b16",
    error: "#dc322f",
    info: "#6c71c4",
  },
  warmSpring: {
    background: "#f0efeb",
    foreground: parseColor([15, 14, 15]),
    primary: "#b294a0",
    secondary: "#7c8d7d",
    tertiary: "#d9966e",
    accent: "#c2ccd6",
    border: "#e6e2e0",
    highlight: "#f2d5cf",
    muted: "#e6e2e0",
    success: "#a6d189",
    warning: "#e6c384",
    error: "#ea6962",
    info: "#89b4fa",
  },
  trustInBlue: {
    background: "#e9e9e9",
    foreground: "#1c2127",
    primary: "#3148f6",
    secondary: "#1c4b8f",
    tertiary: "#4ea1f7",
    accent: "#1c2127",
    border: "#d0d0d0",
    highlight: "#f0f8ff",
    muted: "#d0d0d0",
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    info: "#17a2b8",
  },
  contemporaryCollegiate: {
    background: "#f5f5f5",
    foreground: parseColor([43, 45, 46]),
    primary: "#296273",
    secondary: "#a8d6f7",
    tertiary: "#442e6f",
    accent: "#f7f3f3",
    border: "#e0e0e0",
    highlight: "#fff5e1",
    muted: "#e0e0e0",
    success: "#49a07d",
    warning: "#ee7e32",
    error: "#f44336",
    info: "#2196f3",
  },
  moodyRose: {
    background: "#24222d",
    foreground: "#a59a7e",
    primary: "#7b3947",
    secondary: "#9c7379",
    tertiary: parseColor([156, 145, 165]),
    accent: "#3a2e39",
    border: "#3a2e39",
    highlight: "#5a4e4d",
    muted: "#3a2e39",
    success: "#6a9955",
    warning: "#d7ba7d",
    error: "#f44747",
    info: "#569cd6",
  },
};

export type ColorPaletteType = keyof typeof ColorPalettes;
