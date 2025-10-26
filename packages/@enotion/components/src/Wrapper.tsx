import { ColorPalettes, ColorPaletteType } from "@enotion/core";
import { HTMLAttributes } from "react";

export interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  palette?: ColorPaletteType;
}

export const Wrapper = ({ children, palette, ...props }: WrapperProps) => {
  const color = palette ? ColorPalettes[palette] : undefined;

  return (
    <div
      style={{
        backgroundColor: color?.background,
        color: color?.foreground,
        margin: 0,
        padding: 0,
        maxHeight: "100vh",
        overflow: "clip",
        maxWidth: "100vw",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
