"use client";
import { useColorPalette, useTheme } from "@enotion/hooks";
import { LayoutContainer } from "@enotion/components";
import type { ReactNode } from "react";

/**
 * AppLayout component that wraps children in LayoutContainer with the current color palette.
 * This must be used INSIDE the Provider to have access to the ColorPaletteProvider context.
 */
export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { palette } = useColorPalette();
  const { theme } = useTheme();

  return (
    <LayoutContainer
      colorPalette={palette}
      renderChildren={children}
      style={{
        backgroundColor: theme === "dark" ? "#00000000" : "#ffffffee",
        color: theme === "dark" ? "#eeeddddd" : "#11100000"
      }}
    />
  );
};
