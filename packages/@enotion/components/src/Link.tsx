import { ColorPalettes, ColorPaletteType } from "@enotion/core/constants";
import { AnchorHTMLAttributes, ReactNode } from "react";
import "./styles/link.css";

/**
 * Props for the Link component.
 */
export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  colorPalette?: ColorPaletteType;
  children: ReactNode;
  href: string;
}

/**
 * A customizable Link component with optional color palette support.
 * @see {@link LinkProps}
 *  @param {ColorPaletteType} [props.colorPalette] - Optional color palette to style the link.
 *  @param {string} props.href - The URL that the link points to.
 *  @param {ReactNode} props.children - The content of the link.
 * @example
 * ```tsx
 * <Link href="https://example.com" colorPalette="dark">Example</Link>
 * ```
 */
export function Link({ colorPalette, href, children, ...rest }: LinkProps) {
  const palette = colorPalette ? ColorPalettes[colorPalette] : null;

  return (
    <a
      href={href}
      style={
        palette
          ? ({
            "--link-color": palette.primary,
            "--link-hover-color": palette.accent,
            "--link-visited-color": palette.secondary,
            ...rest.style,
          } as React.CSSProperties)
          : rest.style
      }
      {...rest}
    >
      {children}
    </a>
  );
}
