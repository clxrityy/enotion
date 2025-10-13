import { ColorPalettes, ColorPaletteType } from "@enotion/config/constants";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import "./styles/card.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  colorPalette?: ColorPaletteType;
}

export const Card = ({ children, colorPalette, ...props }: CardProps) => {

  const palette = colorPalette ? ColorPalettes[colorPalette] : null;

  return (
    <div
      {...props}
      className={`enotion-card ${props.className || ""}`}
      style={{
        ...(palette
          ? ({
            backgroundColor: palette.background,
            color: palette.foreground,
            "--card-box-shadow": `0 1px 3.5px ${palette.border}33, 0 1px 2px ${palette.border}1A`,
            "--card-hover-box-shadow": `0 4px 6px ${palette.border}3D, 0 1px 3px ${palette.border}1A`,
            "--card-backdrop-background-color": palette.muted,
            "--card-hover-background-color": palette.muted,
            "--card-active-background-color": palette.background,
            "--card-hover-border-color": palette.primary,
            "--card-active-border-color": palette.primary,
            "--card-border-color": palette.border,
            "--card-backdrop-border-color": palette.border,
            "--card-backdrop-box-shadow": `0 0 0 1px ${palette.border}1A`,
            "--card-backdrop-hover-box-shadow": `0 0 0 1px ${palette.border}33, 0 4px 6px ${palette.border}3D, 0 1px 3px ${palette.border}1A`,
            ...props.style,
          } as CSSProperties)
          : {
            ...(props.style as CSSProperties),
          }),
      }}
    >
      {children}
    </div>
  );
}
