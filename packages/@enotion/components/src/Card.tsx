import { ColorPalettes, ColorPaletteType } from "@enotion/core/constants";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import "./styles/card.css";
import { cn } from "@enotion/core/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  palette?: ColorPaletteType;
}

export const Card = ({ children, palette, ...props }: CardProps) => {
  const color = palette ? ColorPalettes[palette] : null;

  return (
    <div
      className={cn("enotion-card", props.className)}
      style={{
        ...(palette
          ? ({
            backgroundColor: color?.background,
            color: color?.foreground,
            "--card-box-shadow": `0 1px 3.5px ${color?.border}33, 0 1px 2px ${color?.border}1A`,
            "--card-hover-box-shadow": `0 4px 6px ${color?.border}3D, 0 1px 3px ${color?.border}1A`,
            "--card-backdrop-background-color": color?.muted,
            "--card-hover-background-color": color?.muted,
            "--card-active-background-color": color?.background,
            "--card-hover-border-color": color?.primary,
            "--card-active-border-color": color?.primary,
            "--card-border-color": color?.border,
            "--card-backdrop-border-color": color?.border,
            "--card-backdrop-box-shadow": `0 0 0 1px ${color?.border}1A`,
            "--card-backdrop-hover-box-shadow": `0 0 0 1px ${color?.border}33, 0 4px 6px ${color?.border}3D, 0 1px 3px ${color?.border}1A`,
            ...props.style,
          } as CSSProperties)
          : {
            ...(props.style as CSSProperties),
          }),
      }}
      {...props}
    >
      {children}
    </div>
  );
};
