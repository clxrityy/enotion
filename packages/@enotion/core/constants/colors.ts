export type Color =
  | number
  | string
  | [number, number, number]
  | [number, number, number, number]
  | { r: number; g: number; b: number }
  | { red: number; green: number; blue: number };

export interface ColorPalette {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  border: string;
  highlight: string;
  muted: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * A collection of predefined color palettes.
 * Each palette includes colors for various UI elements.
 * @see {@link ColorPaletteType}
 */

export const ColorPalettes: Record<string, ColorPalette> = {
  default: {
    background: "#ffffff",
    foreground: "#112200", // Improved contrast while softer than pure black
    border: "#dddeee", // More neutral gray
    primary: "#2563ff", // Modern blue with better contrast
    secondary: "#7c3ead", // Complementary purple-ish blue
    tertiary: "#4b5afc", // A mixture of primary and secondary for balance
    accent: "#0c5ebdee", // Darker blue for accents
    highlight: "#fef3c7", // Soft yellow background for highlights
    muted: "#bbbccc", // A muted light gray background
    success: "#10b981", // Modern green with good contrast
    warning: "#f59e0b", // Amber for better readability
    error: "#ef4444", // Modern red with proper contrast
    info: "#3b82f6", // Clear blue for information
  },
  dark: {
    background: "#111100", // Deep blue-gray for reduced eye strain
    foreground: "#f1f5f9", // Soft white for better readability
    border: "#1ee0011", // Subtle border that's visible but not harsh
    primary: "#31a9d9", // Bright blue that works well on dark backgrounds
    secondary: "#a78bfa", // Light purple for good contrast
    tertiary: "#34d399", // Bright green that pops on dark
    accent: "#60a6ee", // Soft blue-purple for accents
    highlight: "#1e293b", // Darker highlight for selection
    muted: "#121212", // Consistent muted background
    success: "#22c55e", // Vibrant but not harsh green
    warning: "#fbbf24", // Warm yellow for warnings
    error: "#f87171", // Soft red that's not too aggressive
    info: "#38bdf8", // Cyan-blue for information
  },
  monochrome: {
    background: "#d0d0d0", // Light gray background
    foreground: "#1f2937", // Softer than pure black
    border: "#9ca3af", // More visible border
    primary: "#4b5563", // Medium gray with good contrast
    secondary: "#6b7280", // Slightly lighter gray
    tertiary: "#374151", // Darker gray for hierarchy
    accent: "#111827", // Very dark gray instead of pure black
    highlight: "#f3f4f6", // Subtle gray highlight
    muted: "#f9fafb", // Very light gray background
    success: "#10b981", // Keep colorful status indicators
    warning: "#f59e0b", // Keep colorful status indicators
    error: "#ef4444", // Keep colorful status indicators
    info: "#3b82f6", // Keep colorful status indicators
  },
  softBeach: {
    background: "#fff8e1", // Soft sandy background
    foreground: "#3e2723", // Dark brown for readability
    border: "#ffe0b2", // Light orange border
    primary: "#0365da", // Water blue primary color
    secondary: "#ffcc80", // Light orange secondary color
    tertiary: "#008080", // Teal tertiary color
    accent: "#ddab91", // Soft coral accent
    highlight: "#fff3e0", // Light highlight for selection
    muted: "#fbe9e7", // Very light coral background
    success: "#81c784", // Soft green for success
    warning: "#ffb74d", // Warm orange for warnings
    error: "#e57373", // Soft red for errors
    info: "#64b5f6", // Light blue for information
  },
};

/**
 * Type representing the keys of the ColorPalettes object.
 * - `default`: A clean and modern palette with blue accents.
 * - `dark`: A dark theme with vibrant accent colors.
 * - `monochrome`: A simple black and white palette for high contrast.
 * - `softBeach`: A warm and inviting palette with sandy and coral tones.
 *
 * @see {@link ColorPalettes}
 */
export type ColorPaletteType = keyof typeof ColorPalettes;
