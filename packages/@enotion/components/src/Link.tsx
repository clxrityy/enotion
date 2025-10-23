import { ColorPalettes, ColorPaletteType } from "@enotion/core/constants";
import { AnchorHTMLAttributes, ReactNode } from "react";
import "./styles/link.css";

/**
 * Props for the Link component.
 */
export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  palette?: ColorPaletteType;
  children: ReactNode;
  href: string;
}

/**
 * A customizable Link component with optional color palette support.
 * @see {@link LinkProps}
 *  @param {ColorPaletteType} [props.palette] - Optional color palette to style the link.
 *  @param {string} props.href - The URL that the link points to.
 *  @param {ReactNode} props.children - The content of the link.
 * @example
 * ```tsx
 * <Link href="https://example.com" colorPalette="dark">Example</Link>
 * ```
 */
export function Link({ palette, href, children, ...rest }: LinkProps) {
  const color = palette ? ColorPalettes[palette] : null;

  return (
    <a
      href={href}
      style={
        color
          ? ({
              "--link-color": color.primary,
              "--link-hover-color": color.accent,
              "--link-visited-color": color.secondary,
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
