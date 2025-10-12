import { InputHTMLAttributes } from "react";
import {
  type ColorPaletteType,
  ColorPalettes,
} from "@enotion/config/constants";
import "./styles/input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  colorPalette?: ColorPaletteType;
}

/**
 * A customizable Input component with optional color palette support.
 * @param {ColorPaletteType} [colorPallete] - Optional color palette to style the input.
 * @example
 * ```tsx
 * <Input placeholder="Enter text" colorPallete="dark" />
 * ```
 */
export function Input({ colorPalette, ...rest }: InputProps) {
  const palette = colorPalette ? ColorPalettes[colorPalette] : null;

  if (palette) {
    return (
      <input
        style={
          {
            "--input-border-color": palette.border,
            "--input-focus-border-color": palette.primary,
            "--input-background-color": palette.background,
            "--input-text-color": palette.foreground,
            "--input-placeholder-color": palette.muted,
            "--input-disabled-background-color": palette.muted,
            ...rest.style,
          } as React.CSSProperties
        }
        {...rest}
      />
    );
  }

  return <input {...rest} />;
}
