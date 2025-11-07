"use client";
import { LayoutProvider } from "@enotion/components";
import { LayoutRenderer } from "@enotion/core";
import { ReactNode } from "react";

export function Provider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <LayoutProvider>
      <LayoutRenderer />
      <div className="absolute w-screen h-screen z-0 *:z-10">{children}</div>
    </LayoutProvider>
  );
}
