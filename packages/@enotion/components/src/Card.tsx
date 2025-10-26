import { ColorPalettes, ColorPaletteType } from "@enotion/core/constants";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import "./styles/card.css";
import { cn } from "@enotion/core/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  palette?: ColorPaletteType;
}

/**
 * @description A versatile Card component that can be styled using different color palettes.
 * It provides a container with customizable background, text color, and shadow effects based on the selected palette.
 * The Card component is designed to enhance the visual presentation of content blocks in a React application.
 *
 * @param children - The content to be displayed inside the Card.
 * @param palette - Optional color palette to style the Card.
 * @param props - Additional HTML attributes for the Card component.
 *
 * @example
 * ```tsx
 * import { Card } from '@enotion/components';
 *
 * const MyComponent = () => (
 *   <Card palette="solarized">
 *     <h2>Card Title</h2>
 *     <p>This is some content inside the card.</p>
 *   </Card>
 * );
 * ```
 */
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
