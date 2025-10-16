import type { ColorPalette } from "../types/colors.js";

/**
 * A collection of predefined color palettes.
 * Each palette includes colors for various UI elements.
 * @see {@link ColorPaletteType}
 */

export const ColorPalettes: Record<string, ColorPalette> = {
  default: {
    background: "#ffffff",
    foreground: "#123", // Improved contrast while softer than pure black
    border: "#e5e7eb", // More neutral gray
    primary: "#2563ff", // Modern blue with better contrast
    secondary: "#7c3aed", // Complementary purple for better harmony
    tertiary: "#059669", // Balanced green
    accent: "#dc2626", // Strong red for accents
    highlight: "#fef3c7", // Soft yellow background for highlights
    muted: "#f8fafc", // Slightly warmer neutral
    success: "#10b981", // Modern green with good contrast
    warning: "#f59e0b", // Amber for better readability
    error: "#ef4444", // Modern red with proper contrast
    info: "#3b82f6", // Clear blue for information
  },
  dark: {
    background: "#111100", // Deep blue-gray for reduced eye strain
    foreground: "#f1f5f9", // Soft white for better readability
    border: "#222", // Subtle border that's visible but not harsh
    primary: "#60a5fa", // Bright blue that works well on dark backgrounds
    secondary: "#a78bfa", // Light purple for good contrast
    tertiary: "#34d399", // Bright green that pops on dark
    accent: "#fb7185", // Soft pink-red for accents
    highlight: "#1e293b", // Darker highlight for selection
    muted: "#dddc", // Consistent muted background
    success: "#22c55e", // Vibrant but not harsh green
    warning: "#fbbf24", // Warm yellow for warnings
    error: "#f87171", // Soft red that's not too aggressive
    info: "#38bdf8", // Cyan-blue for information
  },
  solarized: {
    background: "#fdf6e3", // Classic solarized light background
    foreground: "#333", // Improved contrast from original solarized
    border: "#e3dcc9", // Warmer border tone
    primary: "#268bd2", // Classic solarized blue
    secondary: "#d33682", // Solarized magenta
    tertiary: "#2aa198", // Solarized cyan
    accent: "#6c71c4", // Solarized violet
    highlight: "#eee8d5", // Subtle highlight
    muted: "#f7f1e8", // Slightly warmer muted tone
    success: "#859900", // Solarized green
    warning: "#b58900", // Solarized yellow
    error: "#dc322f", // Solarized red
    info: "#268bd2", // Consistent with primary for clarity
  },
  warmSpring: {
    background: "#fefbf7", // Warmer, softer white
    foreground: "#4a4543", // Better contrast than original parseColor result
    primary: "#c084a1", // Enhanced pink-purple for better visibility
    secondary: "#8ba688", // Improved sage green
    tertiary: "#e6a574", // Warmer terracotta
    accent: "#b4c4d1", // Soft blue-gray
    border: "#ede8e5", // Warm neutral border
    highlight: "#f9ede6", // Subtle peach highlight
    muted: "#f4ede9", // Warm muted background
    success: "#7fb069", // Earthy green success
    warning: "#d4a574", // Warm amber warning
    error: "#d67570", // Soft coral error
    info: "#7ba3d4", // Muted blue information
  },
  trustInBlue: {
    background: "#f8fafc", // Softer background with blue undertones
    foreground: "#64748b", // Professional neutral gray-blue
    primary: "#1d6ed1", // Strong, professional blue
    secondary: "#1e40af", // Deeper blue for hierarchy
    tertiary: "#3b82f1", // Brighter accent blue
    accent: "#0f172a", // Opaque slight blue-black
    border: "#cbd5e1", // Blue-tinted border
    highlight: "#eff6ff", // Light blue highlight
    muted: "#f1f5f9", // Subtle blue-gray background
    success: "#059669", // Professional green
    warning: "#d97706", // Professional amber
    error: "#dc2626", // Clean red
    info: "#0284c7", // Information blue that fits theme
  },
  contemporaryCollegiate: {
    background: "#ffffff", // Clean white for modern feel
    foreground: "#374151", // Improved contrast over parseColor result
    primary: "#065f46", // Deep forest green (collegiate)
    secondary: "#0ea5e9", // Bright sky blue
    tertiary: "#7c2d12", // Rich burgundy
    accent: "#f97316", // Vibrant orange accent
    border: "#d1d5db", // Neutral gray border
    highlight: "#fef3c7", // Warm yellow highlight
    muted: "#f9fafb", // Very light gray background
    success: "#047857", // Deep green success
    warning: "#ea580c", // Bright orange warning
    error: "#dc2626", // Strong red error
    info: "#0284c7", // Professional blue info
  },
  moodyRose: {
    background: "#1c1917", // Warmer dark brown-black
    foreground: "#d6d3d1", // Soft warm white for readability
    primary: "#be185d", // Vibrant rose primary
    secondary: "#a21caf", // Deep magenta secondary
    tertiary: "#7c3aed", // Purple tertiary for harmony
    accent: "#f59e0b", // Warm golden accent
    border: "#44403c", // Subtle warm border
    highlight: "#292524", // Dark highlight for selections
    muted: "#262626", // Consistent dark background
    success: "#84cc16", // Bright lime green for visibility
    warning: "#eab308", // Golden yellow warning
    error: "#ef4444", // Bright red that works on dark
    info: "#06b6d4", // Cyan info color for contrast
  },
  monochrome: {
    background: "#ffffff",
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
};

/**
 * Type representing the keys of the ColorPalettes object.
 * - `default`: A clean and modern palette with blue accents.
 * - `dark`: A dark theme with vibrant accent colors.
 * - `solarized`: A balanced palette based on the Solarized color scheme.
 * - `warmSpring`: A soft and warm palette with pastel tones.
 * - `trustInBlue`: A professional palette with shades of blue and gray.
 * - `contemporaryCollegiate`: A fresh palette with collegiate-inspired colors.
 * - `moodyRose`: A sophisticated palette with rose and muted tones.
 * - `monochrome`: A simple black and white palette for high contrast.
 *
 * @see {@link ColorPalettes}
 */
export type ColorPaletteType = keyof typeof ColorPalettes;
