import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { ColorPalettes, ColorPalette } from "@enotion/config/constants";
import "./styles/button.css";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  colorPalette?: ColorPalette;
}

/**
 * A simple Button component.
 *
 * @example
 * ```tsx
 * <Button onClick={() => alert('Clicked!')}>Click Me</Button>
 * ```
 */
export function Button({ children, colorPalette, ...rest }: ButtonProps) {
  const palette = colorPalette ? ColorPalettes[colorPalette] : null;

  return (
    <button
      type={rest.type || "button"}
      style={{
        ...(palette
          ? ({
              backgroundColor: palette.primary,
              color: palette.foreground,
              borderColor: palette.border,
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
