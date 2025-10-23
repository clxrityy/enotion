# `@enotion/core`

Contains core functionalities and utilities used across other `@enotion` packages. Fully tested and written in TypeScript for type safety and reliability.

## Features

- ##### Utilities (`@enotion/core/utils`)
  - `cn.ts` - A utility for conditionally joining class names.
  - `createContextFactory.tsx` - A utility for creating React contexts & providers with ease.
  - `colors.ts` - A collection of color utility functions used throughout the application.
    - `getRGBFromHex(hex: string)`: Converts a hex color code to its RGB representation.
    - `convertRGBToString(rgb: { r: number; g: number; b: number })`: Converts an RGB object to a string format.
    - `getHexFromRGB(r: number, g: number, b: number)`: Converts RGB values to a hex color code.
    - `lightenHexColor(hex: string, amount: number)`: Lightens a hex color by a specified amount.
    - `darkenHexColor(hex: string, amount: number)`: Darkens a hex color by a specified amount.
    - `adjustHexColorOpacity(hex: string, opacity: number)`: Adjusts the opacity of a hex color code.
    - `isValidHexColor(hex: string)`: Validates if a string is a proper hex color code.
    - `blendHexColors(hex1: string, hex2: string, ratio: number)`: Blends two hex colors based on a given ratio.
    - `parseColor(color: Color)`: Parses a color input (hex, rgb, rgba) and returns a standardized format.
- ##### Constants (`@enotion/core/constants`)
  - `colors.ts` - A set of predefined color palettes used throughout the application.
  - `icons.ts` - A collection of [`react-icons`](https://react-icons.github.io/react-icons/) components for consistent iconography.
- ##### Contexts (`@enotion/core/contexts`)
  - `LayoutContext.tsx` - Provides layout-related context and state management.
