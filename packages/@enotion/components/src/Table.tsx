import {
  adjustHexColorOpacity,
  blendHexColors,
  cn,
  ColorPalettes,
  ColorPaletteType,
} from "@enotion/core";
import { CSSProperties, ReactNode, TableHTMLAttributes, useId } from "react";
import "./styles/table.css";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  rows?: {
    title: string;
    items: ReactNode[];
  }[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  palette?: ColorPaletteType;
  /**
   * Enable responsive mode with horizontal scrolling
   * @default true
   */
  responsive?: boolean;
  /**
   * Stack table layout on mobile devices
   * @default false
   */
  stackOnMobile?: boolean;
}

export const Table = ({
  rows = [],
  striped = false,
  bordered = false,
  hover = false,
  palette,
  responsive = true,
  stackOnMobile = false,
  className,
  style,
  ...props
}: TableProps) => {
  const colors = palette ? ColorPalettes[palette] : undefined;
  const tableId = useId();

  const tableElement = (
    <table
      className={cn(
        "enotion-table",
        striped && "enotion-table-striped",
        bordered && "enotion-table-bordered",
        hover && "enotion-table-hover",
        stackOnMobile && "enotion-table-stack-mobile",
        "shadow",
        className,
      )}
      style={
        {
          "--table-foreground": colors?.foreground,
          "--table-background": colors?.background,
          "--table-border": adjustHexColorOpacity(
            colors?.border || colors?.foreground || "#000000",
            0.65,
          ),
          "--table-accent": adjustHexColorOpacity(
            colors?.accent || colors?.foreground || "#000000",
            0.1,
          ),
          "--table-muted": colors?.muted,
          "--table-hover": colors
            ? blendHexColors(colors.background, colors.accent, 0.15)
            : undefined,
          "--table-striped": colors
            ? adjustHexColorOpacity(colors.muted || colors.accent, 0.15)
            : undefined,
          "--table-text-on-accent": colors
            ? blendHexColors(colors.accent, colors.foreground, 0.9)
            : undefined,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <tbody>
        {rows.map((row) => (
          <tr key={`${tableId}-row`}>
            <th scope="row">{row.title}</th>
            {row.items.map((item) => (
              <td key={`${tableId}-cell`}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Wrap in responsive container if enabled
  if (responsive) {
    return <div className="enotion-table-responsive">{tableElement}</div>;
  }

  return tableElement;
};
