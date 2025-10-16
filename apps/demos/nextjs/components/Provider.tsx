"use client";
import { ThemeProvider, ColorPaletteProvider } from "@enotion/hooks";
import { NotificationProvider } from "@enotion/notify";
import type { ReactNode } from "react";

export const Provider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <ColorPaletteProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </ColorPaletteProvider>
  </ThemeProvider>
);
