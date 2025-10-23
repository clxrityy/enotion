import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { ColorPalettes, type ColorPaletteType } from "@enotion/core/constants";
import "./styles/button.css";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  palette?: ColorPaletteType;
}

const palettes = ColorPalettes;

/**
 * A customizable Button component with optional color palette support.
 * @param {ColorPaletteType} [palette] - Optional color palette to style the button.
 * @param {ComponentPropsWithoutRef<"button">} rest - Other standard button attributes.
 *
 * @example
 * ```tsx
 * <Button onClick={() => alert('Clicked!')} colorPalette="dark">Click Me</Button>
 * ```
 */
export function Button({ children, palette, ...rest }: ButtonProps) {
  const color = palette ? palettes[palette] : null;

  return (
    <button
      type={rest.type || "button"}
      style={{
        ...(palette
          ? ({
              backgroundColor: color?.primary,
              color: color?.foreground,
              borderColor: color?.border,
              "--button-hover-background-color": color?.accent,
              "--button-active-background-color": color?.primary,
              "--button-disabled-background-color": color?.muted,
              "--button-disabled-text-color": color?.background,
              "--button-hover-box-shadow": `0 0 0 3px ${color?.accent}33`,
              "--button-focus-ring-color": color?.accent,
              "--button-backdrop-background-color": color?.muted,
              ...rest.style,
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
