import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import {
  ColorPalettes,
  type ColorPaletteType,
} from "@enotion/config/constants";
import "./styles/button.css";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  colorPalette?: ColorPaletteType;
}

const palletes = ColorPalettes;

/**
 * A customizable Button component with optional color palette support.
 * @param {ColorPaletteType} [colorPalette] - Optional color palette to style the button.
 * @param {ComponentPropsWithoutRef<"button">} rest - Other standard button attributes.
 *
 * @example
 * ```tsx
 * <Button onClick={() => alert('Clicked!')} colorPalette="dark">Click Me</Button>
 * ```
 */
export function Button({ children, colorPalette, ...rest }: ButtonProps) {
  const palette = colorPalette ? palletes[colorPalette] : null;

  return (
    <button
      type={rest.type || "button"}
      style={{
        ...(palette
          ? ({
              backgroundColor: palette.primary,
              color: palette.foreground,
              borderColor: palette.border,
              "--button-hover-background-color": palette.accent,
              "--button-active-background-color": palette.primary,
              "--button-disabled-background-color": palette.muted,
              "--button-disabled-text-color": palette.background,
              "--button-hover-box-shadow": `0 0 0 3px ${palette.accent}33`,
              ...(rest.style ? rest.style : {}),
            } as CSSProperties)
          : {
              ...(rest.style as CSSProperties),
            }),
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
