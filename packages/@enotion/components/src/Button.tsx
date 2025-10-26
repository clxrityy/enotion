import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { ColorPalettes, type ColorPaletteType } from "@enotion/core/constants";
import "./styles/button.css";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  palette?: ColorPaletteType;
  variant?:
    | "default"
    | "outline"
    | "primary"
    | "secondary"
    | "tertiary"
    | "info"
    | "success"
    | "danger";
}

const palettes = ColorPalettes;

/**
 * A customizable Button component with optional color palette support.
 * @param {ColorPaletteType} [palette] - Optional color palette to style the button.
 * @param {ComponentPropsWithoutRef<"button">} rest - Other standard button attributes.
 *
 * @example
 * ```tsx
 * <Button onClick={() => alert('Clicked!')} palette="dark">Click Me</Button>
 * ```
 */
export function Button({ children, palette, variant, ...rest }: ButtonProps) {
  const color = palette ? palettes[palette] : null;

  const variantStyles = {
    default: {
      backgroundColor: color?.foreground,
      color: color?.background,
      borderColor: color?.border,
    },
    outline: {
      backgroundColor: "transparent",
      color: color?.primary,
      borderColor: color?.primary,
    },
    primary: {
      backgroundColor: color?.primary,
      color: color?.foreground,
      borderColor: color?.accent,
    },
    secondary: {
      backgroundColor: color?.muted,
      color: color?.foreground,
      borderColor: color?.muted,
    },
    tertiary: {
      backgroundColor: color?.background,
      color: color?.primary,
      borderColor: color?.border,
    },
    info: {
      backgroundColor: color?.info,
      color: color?.foreground,
      borderColor: color?.info,
    },
    success: {
      backgroundColor: color?.success,
      color: color?.foreground,
      borderColor: color?.success,
    },
    danger: {
      backgroundColor: color?.error,
      color: color?.foreground,
      borderColor: color?.error,
    },
  };

  const appliedStyles = variant
    ? variantStyles[variant]
    : variantStyles.default;

  return (
    <button
      type={rest.type || "button"}
      style={{
        ...(palette
          ? ({
              "--button-hover-background-color": color?.accent,
              "--button-active-background-color": color?.primary,
              "--button-disabled-background-color": color?.muted,
              "--button-disabled-text-color": color?.background,
              "--button-hover-box-shadow": `0 0 0 3px ${color?.accent}33`,
              "--button-focus-ring-color": color?.accent,
              "--button-backdrop-background-color": color?.muted,
              ...appliedStyles,
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
