"use client";
import { useTheme } from "@enotion/hooks";
import { LayoutContainer } from "@enotion/components";
import { useCallback, type ReactNode } from "react";
import { ColorPaletteType } from "@enotion/core/constants";

/**
 * AppLayout component that wraps children in LayoutContainer with the current color palette.
 * This must be used INSIDE the Provider to have access to the ColorPaletteProvider context.
 */
export const AppLayout = ({ children, colorPalette }: { children: ReactNode; colorPalette?: ColorPaletteType }) => {

  const { theme } = useTheme();

  const determinePalette = useCallback(() => {
    switch (theme) {
      case "dark":
        return "dark" as ColorPaletteType;
      case "light":
        return "default" as ColorPaletteType;
      default:
        return "default" as ColorPaletteType;
    }
  }, [theme]);

  return (
    <LayoutContainer
      theme={theme}
      colorPalette={colorPalette || determinePalette()}
      renderChildren={children}
    />
  );
}
