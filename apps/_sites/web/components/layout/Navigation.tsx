"use client";

import { useTheme } from "@enotion/hooks";
import { Button, Navbar } from "@enotion/components";
import { ColorPaletteType, Icons } from "@enotion/core/constants";

export const Navigation = ({ colorPalette }: { colorPalette?: ColorPaletteType }) => {
  const { theme, toggle } = useTheme();

  const { DarkMode, LightMode } = Icons;

  return (
    <Navbar position="top" colorPalette={colorPalette ?? (theme === "dark" ? "dark" : "default")}>
      <div className="flex flex-row justify-stretch w-full max-w-sm md:max-w-xl lg:max-w-4xl mx-auto relative h-fit">
        hey
        <div className="w-full flex items-center pr-4 justify-end">
          <Button type="button" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <LightMode /> : <DarkMode />}
          </Button>
        </div>
      </div>
    </Navbar>
  );
};
