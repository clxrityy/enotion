"use client";
import { useTheme } from "@enotion/hooks";
import { LayoutContainer } from "@enotion/components";
import { useCallback, useEffect, type ReactNode } from "react";
import { ColorPaletteType } from "@enotion/core/constants";

/**
 * AppLayout component that wraps children in LayoutContainer with the current color palette.
 * This must be used INSIDE the Provider to have access to the ColorPaletteProvider context.
 */
export const AppLayout = ({
  children,
  colorPalette,
}: {
  children: ReactNode;
  colorPalette?: ColorPaletteType;
}) => {
  const { theme, setTheme } = useTheme();

  const determinePalette: () => ColorPaletteType = useCallback(() => {
    switch (theme) {
      case "dark":
        return "dark" as ColorPaletteType;
      case "light":
        return "default" as ColorPaletteType;
      default:
        return colorPalette as ColorPaletteType;
    }
  }, [theme, colorPalette]);

  // Ensure theme is set on mount
  useEffect(() => {
    if (!theme) {
      setTheme("dark");
    }
  }, [theme, setTheme]);

  return (
    <div className="h-screen w-screen">
      <LayoutContainer
        theme={theme}
        colorPalette={colorPalette ?? determinePalette()}
        renderChildren={children}
      />
    </div>
  );
};
