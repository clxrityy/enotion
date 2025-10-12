import {
  type ColorPaletteType,
  ColorPalettes,
} from "@enotion/config/constants";
import { useState } from "react";
import { createContextFactory } from "./createContextFactory.js";

/**
 * Context for managing the current color palette.
 * @property palette - The current color palette, which can be one of the predefined palettes or undefined.
 * @property setPalette - A function to update the current color palette.
 */
export interface ColorPaletteContext {
  palette: ColorPaletteType | undefined;
  setPalette: (palette: ColorPaletteType) => void;
}

const initialColorPaletteContext: ColorPaletteContext = {
  palette: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPalette: () => {},
};

/**
 *
 */
const useColorPaletteContext = () => {
  const [palette, setPalette] = useState<ColorPaletteType | undefined>(
    initialColorPaletteContext.palette,
  );

  const updatePalette = (newPalette: ColorPaletteType) => {
    if (ColorPalettes[newPalette]) {
      setPalette(newPalette);
    } else {
      console.warn(
        `Invalid color palette: ${newPalette}. Falling back to undefined.`,
      );
      setPalette(undefined);
    }
  };

  return {
    palette,
    setPalette: updatePalette,
  };
};

const { Provider, useContext } = createContextFactory<ColorPaletteContext>(
  initialColorPaletteContext,
  useColorPaletteContext,
);

/**
 * ColorPaletteProvider - A context provider component for managing color palettes.
 * @param children - The child components that will have access to the color palette context.
 * @param context - Optional additional context properties to merge with the default context.
 *
 * @description
 * The `ColorPaletteProvider` component provides a context for managing color palettes in a React application.
 * It uses the `createContextFactory` utility to create a context with an initial state and a hook for managing the state.
 * Child components can access and manipulate the color palette using the `useColorPalette` hook.
 * @example
 * ```tsx
 * import { ColorPaletteProvider } from '@enotion/hooks';
 *
 * const App = () => (
 *   <ColorPaletteProvider>
 *     {children}
 *   </ColorPaletteProvider>
 * );
 * ```
 */
export const ColorPaletteProvider = Provider;

/**
 * useColorPalette - A hook to access the color palette context.
 * @returns An object containing the current color palette and a function to update it.
 * @description
 * The `useColorPalette` hook provides access to the color palette context created by the `ColorPaletteProvider`.
 * It returns the current color palette and a function to update it, allowing components to easily manage and respond to changes in the color palette.
 * @example
 * ```tsx
 * import { useColorPalette } from '@enotion/hooks';
 * import { Button, Input } from '@enotion/components';
 *
 * const MyComponent = () => {
 *   const { palette, setPalette } = useColorPalette();
 *   const [inputValue, setInputValue] = useState(palette || '');
 *
 *   return (
 *     <div>
 *       Current Palette: {palette}
 *       <Input
 *         colorPalette={palette}
 *         placeholder="Enter color palette"
 *         value={inputValue} onChange={(e) => {
 *           setInputValue(e.target.value);
 *           setPalette(e.target.value as ColorPaletteType);
 *         }} />
 *       <Button
 *         colorPalette={palette} onClick={() => setPalette('dark')}>
 *         Set Dark Palette
 *       </Button>
 *     </div>
 *   );
 * };
 * ```
 * @see {@link ColorPaletteProvider} - A context provider component for managing color palettes.
 * @see {@link createContextFactory} - A utility for creating context providers and hooks.
 * @see {@link ColorPaletteType} - Type representing the available color palettes.
 * @module useColorPalette
 */
export const useColorPalette = useContext;
