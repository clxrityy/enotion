"use client";

import { useTheme } from "@enotion/hooks";
import { Button, Navbar } from "@enotion/components";
import { Icons } from "@enotion/core/constants";

export const Navigation = () => {
  const { theme, toggle } = useTheme();

  const { DarkMode, LightMode } = Icons;

  return (
    <Navbar position="left">
      <div className="grid w-full relative h-fit items-center">
        <div className="flex flex-row justify-stretch w-full items-center">
          hey
          <div className="w-full flex items-center pr-4 justify-center">
            <Button type="button" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <LightMode /> : <DarkMode />}
            </Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};
