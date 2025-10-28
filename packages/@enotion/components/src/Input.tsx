import { CSSProperties, InputHTMLAttributes } from "react";
import { type ColorPaletteType, ColorPalettes } from "@enotion/core/constants";
import "./styles/input.css";
import { adjustHexColorOpacity } from "@enotion/core";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  palette?: ColorPaletteType;
}

/**
 * A customizable Input component with optional color palette support.
 * @param {ColorPaletteType} [palette] - Optional color palette to style the input.
 * @example
 * ```tsx
 * <Input placeholder="Enter text" palette="dark" />
 * ```
 */
export function Input({ palette, ...rest }: InputProps) {
  const color = palette ? ColorPalettes[palette] : null;

  return (
    <input
      style={
        {
          "--input-border-color": color?.border,
          "--input-focus-border-color": color?.primary,
          "--input-background-color": color?.background,
          "--input-text-color": color?.foreground,
          "--input-placeholder-color": adjustHexColorOpacity(
            color?.foreground ?? "#000000",
            0.6,
          ),
          "--input-disabled-background-color": adjustHexColorOpacity(
            color?.foreground ?? "#000000",
            0.1,
          ),
          ...rest.style,
        } as CSSProperties
      }
      {...rest}
    />
  );
}
